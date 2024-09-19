import { GraphQLError } from "graphql";
import { v4 as uuidv4 } from "uuid";
import { Tickets, TicketProps, Context, statusEnum, JourneySeatProps } from "../../../../type";
import journeySeat from "../../../../models/journey_seats";

type Seat = {
  seatNumber: string; 
  id: string; 
};

type Seats = {
  oneWay?: Seat[];  
  return?: Seat[];  
};

export const bookTicket = async (
  parent: Tickets["parent"],
  args: Tickets["args"],
  { models, db, mtn }: Context
): Promise<TicketProps | null> => {
  const client = await db.connect();
  try {
    await client.query('BEGIN'); // Start transaction

    // Extract the seat selections from the arguments
    const selectedSeats: Seats = JSON.parse(args.seatNumber);

    // Helper function to check if a seat is available
    const checkAndReserveSeat = async (seat: Seat): Promise<JourneySeatProps> => {
      const seatDataQuery = await client.query(journeySeat.getSeatById(seat.id));
      const seatData: JourneySeatProps = seatDataQuery.rows[0];

      if (!seatData) {
        throw new Error(`Seat with ID ${seat.id} not found`);
      }

      if (seatData.is_booked) {
        throw new Error(`Seat ${seat.seatNumber} is already booked`);
      }

      // Reserve the seat by marking it as booked temporarily (can later commit or rollback)
      await client.query(journeySeat.reserveSeat(seat.id));
      
      return seatData;
    };

    // Check and reserve one-way seats
    if (selectedSeats.oneWay) {
      for (const seat of selectedSeats.oneWay) {
        await checkAndReserveSeat(seat);
      }
    }

    // Check and reserve return seats
    if (selectedSeats.return) {
      for (const seat of selectedSeats.return) {
        await checkAndReserveSeat(seat);
      }
    }

    // Verify user account before proceeding with the payment
    const checkPaymentAccount = await mtn.verifyAccountHolder(args.partyId);
    if (!checkPaymentAccount) {
      throw new Error("Invalid or expired payment account");
    }

    // Generate a reference ID and request payment
    const x_reference_id = uuidv4();
    const requestToPayResponse = await mtn.requestToPay(x_reference_id, {
      amount: args.amount.toString(),
      currency: args.currency,
      externalId: x_reference_id,
      payer: {
        partyIdType: args.partyIdType,
        partyId: args.partyId,
      },
      payerMessage: args.payerMessage,
      payeeNote: args.payeeNote,
    });

    if (!requestToPayResponse) {
      throw new Error("Failed to request payment from MTN");
    }

    // Validate the payment response
    const verifyTransaction = await mtn.requestToPayTransaction(x_reference_id);
    if (verifyTransaction.status !== statusEnum.SUCCESS) {
      throw new Error(`Payment failed: ${verifyTransaction?.reason?.message}`);
    }

    // Prepare ticket data
    const ticketData: TicketProps = {
      ...args,
      ...verifyTransaction,
      amount: parseInt(verifyTransaction.amount),
    };

    // Insert the ticket data into the database
    const regDBResponse = await client.query(models.tickets.addTicket(ticketData));
    const savedTicket: TicketProps = regDBResponse.rows[0];

    // Commit the transaction and mark seats as booked
    await client.query('COMMIT');

    return savedTicket;

  } catch (error) {
    // Rollback in case of any failure
    await client.query('ROLLBACK');
    throw new GraphQLError(`Failed to book ticket: ${error.message}`);
  } finally {
    await client.release();
  }
};
