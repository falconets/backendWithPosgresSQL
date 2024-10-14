import {
  Context,
  seatAllocationStatsProps,
  seatAllocationStatsType,
} from "@types";
import { GraphQLError } from "graphql";

export const bus_seat_occupancy_report = async (
  parent: seatAllocationStatsType["parent"],
  args: seatAllocationStatsType["args"],
  { models, db, firestore }: Context
): Promise<seatAllocationStatsProps[]> => {
  try {
    // Step 1: Fetch journey instances by date
    const getJourneyInstancesByDate = await models.journeyInstances.getJourneyInstancesByDate(
      firestore,
      args.date as string
    );

    // Step 2: Map journey instances to their IDs
    const journeyInstances = getJourneyInstancesByDate.map(
      (instance) => instance.id as string
    );

    if (journeyInstances.length > 0) {
      // Step 3: Run the bus seat occupancy report query with the journey instance IDs
      const res = await db.query(
        models.statistic.bus_seat_occupancy_report(journeyInstances, args.companyId as number)
      );

      // Step 4: Map the results to match the seatAllocationStatsProps structure
      const seatAllocationStats: seatAllocationStatsProps[] = res.rows.map((row) => {
        const journeyInstance = getJourneyInstancesByDate.find(
          (instance) => instance.id === row.journey_instance_id
        );
        
        return {
          bus_plate_number: row.bus_plate_number,
          routeId: journeyInstance?.routeId || undefined,
          total_seats: row.total_seats,
          total_available_seats: row.total_available_seats,
          total_booked_seats: row.total_booked_seats
        };
      });

      return seatAllocationStats;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    throw new GraphQLError("Something went wrong!");
  }
};

