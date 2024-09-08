import {
  busesProp,
  BusSchedule,
  BusScheduleProps,
  BusSeats,
  Context,
} from "@types";
import { GraphQLError } from "graphql";

export const addBusSchedule = async (
  parent: BusSchedule["parent"],
  args: BusSchedule["args"],
  { models, db, firestore, user }: Context
): Promise<BusScheduleProps | string> => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    return await firestore.runTransaction(async (transaction)=>{

    //TODO: find the bus in question
    const resBus = await client.query(
      models.buses.busByPlateNumber(args.busPlateNumber)
    );
    if (!resBus || resBus.rowCount === 0) {
      throw new GraphQLError("Bus not found!");
    }

    const bus: busesProp = resBus.rows[0];

    //TODO: get the bus seat layout
    const resSeats = await client.query(
      models.bus_seats.getSeatsByBusId(bus.bus_id as string)
    );
    if (!resSeats || resSeats.rowCount === 0)
      throw new GraphQLError("Bus seat layout not found!");

    const seatLayout: BusSeats[] = resSeats.rows;

    const res = await models.schedules.addBusSchedule(firestore,transaction, args);

    //TODO: populate journey_seat for each seat
    if (res.id !== undefined) {
      await Promise.all(
        seatLayout.map(async (seat) => {
          const journeySeat = {
            schedule_id: res.id as string,
            seat_id: seat.seat_id,
            is_booked: false,
          };
          await client.query(models.journey_seats.addJourneySeats(journeySeat));
        })
      );
    }

    await client.query('COMMIT');
    return res;
  })
  } catch (error) {
    await client.query('ROLLBACK');
    throw new GraphQLError("Failed to add bus schedule!");
  } finally {
    client.release();
  }
};

