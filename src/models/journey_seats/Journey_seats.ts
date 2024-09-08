import { JourneySeatProps } from "@types";
import { v4 as uuidv4 } from "uuid";


const addJourneySeats = (s: JourneySeatProps) => {
    const uuid = uuidv4();

  return {
    text: `INSERT INTO public.journey_seats (id, "schedule_id", "seat_id", "is_booked")
     VALUES ($1, $2, $3, $4) RETURNING *;`,
    values: [
        uuid,
        s.schedule_id,
        s.seat_id,
        s.is_booked,
    ],
  };
};

export default {
    addJourneySeats
}
