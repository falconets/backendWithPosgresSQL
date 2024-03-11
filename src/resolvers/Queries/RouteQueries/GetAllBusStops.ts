import { GraphQLError } from "graphql";
import { BusStopProps, BusStops, Context } from "@types";

export const getBusStops = async (
  parent: BusStops["parent"],
  args: BusStops["args"],
  { db, models, user }: Context
): Promise<BusStopProps[]> => {
  try {
    const routes = await db.query(models.routes.getBusStop(args));
    return routes.rows;
  } catch (error) {
    throw new GraphQLError("Failed to retrieve the bus routes!");
  }
};
