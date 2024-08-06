import { Tickets, TicketProps, Context } from "@types";
import { GraphQLError } from "graphql";

export const getTickets = async (
  parent: Tickets["parent"],
  args: Tickets["args"],
  { models, db }: Context
): Promise<TicketProps[]> => {
  try {
    const res = await db.query(models.tickets.getTickets());
    return res.rows.slice(0, 99);
  } catch (error) {
    console.log(error.message);
    throw new GraphQLError("Failed to return tickets!");
  }
};
