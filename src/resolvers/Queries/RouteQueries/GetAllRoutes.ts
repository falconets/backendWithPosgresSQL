import { GraphQLError } from "graphql";
import { BusRoutes, BusRoutesProps, Context } from "@types";

export const getBusRoutes = async (
  parent: BusRoutes["parent"],
  args: BusRoutes["args"],
  { db, models, user }: Context
): Promise<BusRoutesProps[]> => {
  try {
    const routes = await db.query(models.routes.getBusRoutes());
    console.log(routes)
    return routes.rows;
  } catch (error) {
    throw new GraphQLError("Failed to retrieve the bus routes!");
  }
};
