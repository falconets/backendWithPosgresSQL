import { JourneySeatProps } from "@types";
import { v4 as uuidv4 } from "uuid";

// Function to add journey seats with a generated UUID
const addJourneySeats = (seat: JourneySeatProps) => {
  const uuid = uuidv4();

  return {
    text: `
      INSERT INTO public.journey_seats 
      (id, "schedule_id", "seat_id", "is_booked")
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `,
    values: [uuid, seat.schedule_id, seat.seat_id, seat.is_booked],
  };
};

// Function to fetch journey seats by schedule ID
const getJourneySeatsByScheduleId = (scheduleId: string) => {
  return `
    SELECT * FROM public.journey_seats 
    WHERE "schedule_id" = '${scheduleId}';
  `;
};

// Function to fetch a seat by seat ID
const getSeatById = (seatId: string) => {
  return `
    SELECT * FROM public.journey_seats 
    WHERE "seat_id" = '${seatId}';
  `;
};

// Function to fetch journey seats by journey seat ID
const getJourneySeatsById = (id: string) => {
  return `
    SELECT * FROM public.journey_seats 
    WHERE id = '${id}';
  `;
};

// Function to reserve a seat by updating its 'is_booked' status
const reserveSeat = (seatId: string) => {
  return `
       UPDATE public.journey_seats 
      SET "is_booked" = TRUE 
      WHERE "seat_id" = '${seatId}' 
      RETURNING *;
    `;
};

export default {
  addJourneySeats,
  getJourneySeatsByScheduleId,
  getSeatById,
  getJourneySeatsById,
  reserveSeat,
};
