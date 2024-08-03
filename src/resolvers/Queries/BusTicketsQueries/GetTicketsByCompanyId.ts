import { Tickets, TicketProps, Context } from "@types";
import { GraphQLError } from "graphql";

export const getTicketsByCompanyId = async (
  parent: Tickets["parent"],
  args: Tickets["args"],
  { models, db }: Context
): Promise<TicketProps[]> => {
    console.log(args.companyId);
  try {
    const res = await db.query(models.tickets.getTicketsByCompanyId(args));
    console.log(res.rowCount);
    return res.rows.slice(0, 99);
  } catch (error) {
    console.log(error.message);
    throw new GraphQLError("Failed to return tickets!");
  }
};
