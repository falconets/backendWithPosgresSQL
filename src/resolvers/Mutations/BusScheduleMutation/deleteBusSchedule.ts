import { BusSchedule, Context } from "@types";
import { GraphQLError } from "graphql";

export const deleteBusSchedule = async (
  parent: BusSchedule["parent"],
  args: BusSchedule["args"],
  { models, firestore, user, db }: Context
): Promise<boolean> => {
  const scheduleId = args.id as string;

  try {
    const client = await db.connect();

    // Get journey instances by schedule
    const journeyInstances = await models.journeyInstances.getJourneyInstancesByScheduleId(
      firestore,
      scheduleId
    );

    try {
      await client.query("BEGIN");

      // Delete journey seats associated with the journey instances
      if (journeyInstances.length > 0) {
        const journeyInstanceIds: string[] = journeyInstances.map(
          (instance) => instance.id as string
        );

        await client.query(
          models.journey_seats.deleteJourneySeats(journeyInstanceIds)
        );
      }

      // Commit the transaction after deleting seats
      await client.query("COMMIT");
    } catch (seatDeletionError) {
      // Rollback transaction in case of seat deletion failure
      await client.query("ROLLBACK");
      console.error("Error deleting journey seats: ", seatDeletionError);
      throw new GraphQLError("Failed to delete journey seats!");
    } finally {
      client.release();
    }

    // Delete journey instances associated with the schedule
    try {
      await models.journeyInstances.deleteJourneyInstancesByScheduleId(
        firestore,
        scheduleId
      );
    } catch (instanceDeletionError) {
      console.error("Error deleting journey instances: ", instanceDeletionError);
      throw new GraphQLError("Failed to delete JourneyInstances!");
    }

    // Delete the bus schedule itself
    const scheduleDeletionResult = await models.schedules.deleteBusSchedule(
      firestore,
      scheduleId
    );

    return scheduleDeletionResult;
  } catch (error) {
    console.error("Error deleting bus schedule: ", error);
    throw new GraphQLError("Failed to delete the bus schedule!");
  }
};
