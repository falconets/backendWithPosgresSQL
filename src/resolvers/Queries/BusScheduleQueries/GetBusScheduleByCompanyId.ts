import { BusSchedule, BusScheduleProps, Context } from "@types";
import { GraphQLError } from "graphql";

export const getBusScheduleByCompanyId = async (
  parent: BusSchedule["parent"],
  args: BusSchedule["args"],
  { models, firestore }: Context
): Promise<BusScheduleProps[]> => {
  try {
    console.log('received bus schedule', args.companyId)
    const res = await models.schedules.getBusScheduleByCompanyId(
      firestore,
      args.companyId
    );
    return res as BusScheduleProps[];
  } catch (error) {
    throw new GraphQLError("Failed to return the bus schedule by comapany!");
  }
};
