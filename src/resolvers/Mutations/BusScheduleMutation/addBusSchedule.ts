import { BusSchedule, BusScheduleProps, Context } from "@types";
import { GraphQLError } from "graphql";

export const addBusSchedule = async (
  parent: BusSchedule["parent"],
  args: BusSchedule["args"],
  { models, firestore, user }: Context
): Promise<BusScheduleProps | string> => {
  try {
    const res = await models.schedules.addBusSchedule(
      firestore,
      args
    );
    return res;
  } catch (error) {
    throw new GraphQLError("Failed to add the bus routes!");
  }
};
