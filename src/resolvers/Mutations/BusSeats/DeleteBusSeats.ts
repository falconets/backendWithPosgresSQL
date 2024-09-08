import { BusSeatsProp, Context } from "@types";
import { GraphQLError } from "graphql";

export const deleteBusSeats = async (
  parent: BusSeatsProp["parent"],
  args: BusSeatsProp["args"],
  { models, user, db }: Context
): Promise<boolean> => {
  try {
    const res = await db.query(models.bus_seats.deleteBusSeats(args.busId));
    if (res.rowCount && res.rowCount > 0) return true;
    else return false;
  } catch (error) {
    throw new GraphQLError("Failed to delete the bus seats!");
  }
};
