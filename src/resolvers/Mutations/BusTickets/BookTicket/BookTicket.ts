import { GraphQLError } from "graphql";
import { v4 as uuidv4 } from "uuid";
import { Tickets, TicketProps, Context, statusEnum, BusRoutesProps } from "../../../../type";

export const bookTicket = async (
  parent: Tickets["parent"],
  args: Tickets["args"],
  { models, db, mtn }: Context
): Promise<TicketProps | null> => {
  try {
    const x_reference_id = uuidv4();
    let data: TicketProps | null = null;

    //verify user acount before booking a ticket
    const checkPaymentAccount = await mtn.verifyAccountHolder(args.partyId);
    if (!checkPaymentAccount) {
      throw new Error("Invalid or expired payment account");
    }

    //request payment from mtn
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
      throw new Error("Failed to request payment from Mtn");
    }

    //validate payment response from mtn
    try{
      const verifyTransaction = await mtn.requestToPayTransaction(x_reference_id);
      if(verifyTransaction.status !== statusEnum.SUCCESS){
        throw new Error(`Payment failed: ${verifyTransaction?.reason?.message}`);
      }
      data = {
        ...args,
        ...verifyTransaction,
        amount: parseInt(verifyTransaction.amount),
      }

      const regDBresponse = await db.query(models.tickets.addTicket(data))
      const resData: TicketProps= regDBresponse.rows[0];

      data= {...resData}
      console.log('data',data)

      return data
    }catch(error){
      throw new Error(`oops something went wrong with the transaction ${error.message}`);
    }
    //add ticket to the database
    
  } catch (error) {
    throw new GraphQLError(`Failed to book ticket!: ${error.message}`);
  }
};
