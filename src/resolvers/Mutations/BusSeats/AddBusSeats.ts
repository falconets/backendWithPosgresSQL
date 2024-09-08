import { BusSeats, BusSeatsProp, Context } from "@types";
import { GraphQLError } from "graphql";

export const addBusSeats = async (
  parent: BusSeatsProp["parent"],
  args: BusSeatsProp["args"],
  { models, user,db }: Context
): Promise<BusSeats | string> => {
  try {
    const res = await db.query(models.bus_seats.addBusSeats(args))
    return res.rows[0];
    
  } catch (error) {
    throw new GraphQLError("Failed to add the bus routes!");
  }
};
