import { GraphQLError } from "graphql";
import { BusRoutesStopProps, BusRoutesStops, Context } from "@types";

export const getBusRoutesStops = async (
  parent: BusRoutesStops["parent"],
  args: BusRoutesStops["args"],
  { db, models, user }: Context
): Promise<BusRoutesStopProps[]> => {
  try {
    const routes = await db.query(models.routes.getBusRouteStops());
    return routes.rows;
  } catch (error) {
    throw new GraphQLError("Failed to retrieve the bus routes!");
  }
};
