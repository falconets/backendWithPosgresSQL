import { BusSchedule, Context } from "@types";
import { GraphQLError } from "graphql";

export const deleteBusSchedule = async (
  parent: BusSchedule["parent"],
  args: BusSchedule["args"],
  { models, firestore, user }: Context
): Promise<boolean> => {
  try {
    const res = await models.schedules.deleteBusSchedule(
      firestore,
      args.id as string
    );
    return res;
  } catch (error) {
    throw new GraphQLError("Failed to delete the bus schedule!");
  }
};
