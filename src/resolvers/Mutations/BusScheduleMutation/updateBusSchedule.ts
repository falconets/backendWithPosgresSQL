import { BusSchedule, BusScheduleProps, Context } from "@types";
import { GraphQLError } from "graphql";

export const updateBusSchedule = async (
  parent: BusSchedule["parent"],
  args: BusSchedule["args"],
  { models, firestore, user }: Context
): Promise<Partial<BusScheduleProps>> => {
  try {
    const res = await models.schedules.updateBusSchedule(
      firestore,
      args.id as string,
      args
    );
    return res;
  } catch (error) {
    throw new GraphQLError("Failed to add the bus routes!");
  }
};
