import { BusSchedule, BusScheduleProps, Context } from "@types";
import { GraphQLError } from "graphql";

export const getBusScheduleByRouteId = async (
  parent: BusSchedule["parent"],
  args: BusSchedule["args"],
  { models, firestore }: Context
): Promise<BusScheduleProps[]> => {
  try {
    const res = await models.schedules.getBusScheduleByRouteId(
      firestore,
      args.route_id
    );
    return res as BusScheduleProps[];
  } catch (error) {
    throw new GraphQLError("Failed to return the bus schedule by routeId!");
  }
};
