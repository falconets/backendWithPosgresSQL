import { GraphQLError } from "graphql";
import { BusRoutesStops, BusStopProps, Context } from "@types";

export const getBusRoutesStops = async (
  parent: BusRoutesStops["parent"],
  args: BusRoutesStops["args"],
  { db, models, user }: Context
): Promise<BusStopProps[]> => {
  try {
    const routes = await db.query(models.routes.getBusRouteStops(args));
    const busStops = routes.rows.map(async (row) => {
      const busStop: BusStopProps = {
        id: row.id,
        companyid: row.companyid,
        stopName: row.stopName,
        latitude: row.latitude,
        longitude: row.longitude,
        description: row.description,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        route: {
          routeId: row.routeId,
          stopId: row.stopId,
          stopOrder: row.stopOrder,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt
        }
      };
      return busStop
    })

    return Promise.all(busStops);
  } catch (error) {
    throw new GraphQLError("Failed to retrieve the bus routes!");
  }
};
