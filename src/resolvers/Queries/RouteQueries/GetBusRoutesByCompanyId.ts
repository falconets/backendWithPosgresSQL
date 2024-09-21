import { GraphQLError } from "graphql";
import { BusRoutes, BusRoutesProps, Context } from "@types";

export const getBusRoutesByCompanyId = async (
  parent: BusRoutes["parent"],
  args: BusRoutes["args"],
  { db, models, user }: Context
): Promise<BusRoutesProps[]> => {
  try {
    const routes = await db.query(models.routes.getBusRoutesByCompanyId(args.companyId));
    return routes.rows;
  } catch (error) {
    throw new GraphQLError("Failed to retrieve the bus routes!");
  }
};
