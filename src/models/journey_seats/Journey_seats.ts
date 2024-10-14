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
  return {
    text: `
      SELECT * FROM public.journey_seats 
      WHERE "schedule_id" = $1;
    `,
    values: [scheduleId],
  };
};

// Function to fetch a seat by seat ID
const getSeatById = (seatId: string) => {
  return {
    text: `
      SELECT * FROM public.journey_seats 
      WHERE "seat_id" = $1;
    `,
    values: [seatId],
  };
};

const getJourneySeatsByIds = (seatIds: string[]) => {
  const placeholders = seatIds.map((_, index) => `$${index + 1}`).join(', ');

  return {
    text: `
      SELECT * FROM public.journey_seats 
      WHERE id IN (${placeholders});
    `,
    values: seatIds,
  };
}

const getJourneySeatsById = (seatId: string) => {
  return {
    text: `
      SELECT * FROM public.journey_seats 
      WHERE id = $1;
    `,
    values: [seatId],
  };
};

const reserveSeats = (seatIds: string[]) => {
  const placeholders = seatIds.map((_, index) => `$${index + 1}`).join(', ');

  return {
    text: `
      UPDATE public.journey_seats 
      SET "is_booked" = TRUE 
      WHERE id IN (${placeholders}) 
      RETURNING *;
    `,
    values: seatIds,
  };
};

const updateBookingId = (id: string, bookingReference: string) => {
  return {
    text: `
      UPDATE public.journey_seats 
      SET "booking_id" = $1 
      WHERE "id" = $2 
      RETURNING *;
    `,
    values: [bookingReference, id],
  };
}

const deleteJourneySeats = (scheduleId: string[]) => {
  const placeholders = scheduleId.map((_, index) => `$${index + 1}`).join(', ');

  return {
    text: `
      DELETE FROM public.journey_seats 
      WHERE "schedule_id" IN (${placeholders});
    `,
    values: scheduleId,
  };
}

export default {
  addJourneySeats,
  getJourneySeatsByScheduleId,
  getSeatById,
  getJourneySeatsByIds,
  getJourneySeatsById,
  reserveSeats,
  updateBookingId,
  deleteJourneySeats,
};
