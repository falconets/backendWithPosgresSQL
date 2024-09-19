import {
  busesProp,
  BusSchedule,
  BusScheduleProps,
  BusSeats,
  Context,
  journeyInstanceProps,
} from "@types";
import { GraphQLError } from "graphql";
import expandRecurrenceDates from "../../../utils/expandRecurrence";

export const addBusSchedule = async (
  parent: BusSchedule["parent"],
  args: BusSchedule["args"],
  { models, db, firestore, user }: Context
): Promise<BusScheduleProps | string> => {
  const client = await db.connect();

  try {
    // Start a transaction
    await client.query('BEGIN');

    // Firestore transaction to ensure atomicity
    return await firestore.runTransaction(async (transaction) => {

      // Fetch the bus using its plate number
      const resBus = await client.query(
        models.buses.busByPlateNumber(args.busPlateNumber)
      );

      if (!resBus || resBus.rowCount === 0) {
        throw new GraphQLError("Bus not found!");
      }

      const bus: busesProp = resBus.rows[0];

      // Fetch the bus seat layout using bus_id
      const resSeats = await client.query(
        models.bus_seats.getSeatsByBusId(bus.bus_id as string)
      );

      if (!resSeats || resSeats.rowCount === 0) {
        throw new GraphQLError("Bus seat layout not found!");
      }

      const seatLayout: BusSeats[] = resSeats.rows;

      // Expand recurrences to generate individual trip dates
      const recurrenceDatesSchedule = expandRecurrenceDates(args);

      // Insert the bus schedule into Firestore
      const res = await models.schedules.addBusSchedule(firestore, transaction, args);

      if (!res.id) {
        throw new GraphQLError("Failed to create the bus schedule!");
      }

      // For each recurrence date, create a journey instance and populate journey_seat
      for (const recurrence of recurrenceDatesSchedule) {
        const journeyData: journeyInstanceProps = {
          scheduleId: res.id as string,
          journeyDate: recurrence.start,
          startTime: recurrence.start,
          endTime: recurrence.end,
          busId: bus.bus_id as string,
          routeId: args.routeId,
          createdAt: new Date().toISOString(),
          companyId: bus?.bus_company?.toString() as string,
        };

        // Create journey instance
        const journeyInstanceRes = await models.journeyInstances.addJourneyInstance(firestore, transaction, journeyData);
        
        
        if (journeyInstanceRes && journeyInstanceRes != null) {
          const journeyInstanceId = journeyInstanceRes.id;

          // Insert the seat layout into journey_seat table for the specific journey instance
          await Promise.all(
            seatLayout.map(async (seat) => {
              const journeySeat = {
                schedule_id: journeyInstanceId as string,
                seat_id: seat.seat_id,
                is_booked: false,
              };
              await client.query(models.journey_seats.addJourneySeats(journeySeat));
            })
          );
        }
      }

      // Commit the transaction
      await client.query('COMMIT');

      return res;
    });
  } catch (error) {
    // Rollback in case of error
    await client.query('ROLLBACK');
    console.error(error);
    throw new GraphQLError("Failed to add bus schedule!");
  } finally {
    client.release();
  }
};
