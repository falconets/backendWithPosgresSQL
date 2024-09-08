import { BusSeats } from "@types";
import { v4 as uuidv4 } from "uuid";

const addBusSeats = (s: BusSeats) => {
  const uuid = uuidv4();

  return {
    text: `INSERT INTO public.bus_seats(
	seat_id, "busId", "seatNumber", "seatType", is_available, "createdAt", "updatedAt", "row", col, "aisleColumn")
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
    values: [
      uuid,
      s.busId,
      s.seatNumber,
      s.seatType,
      s.is_available,
      s.createdAt,
      s.updatedAt,
      s.row,
      s.col,
      s.aisleColumn,
    ],
  };
};

const getSeatsByBusId = (busId: string) => {
  return {
    text: `SELECT * FROM public.bus_seats WHERE "busId"=$1`,
    values: [busId],
  };
};

const deleteBusSeats = (busId: string) => {
    return {
        text: `DELETE FROM public.bus_seats WHERE "busId"=$1`,
        values: [busId],
    }
}

export default {
  addBusSeats,
  getSeatsByBusId,
  deleteBusSeats
};
