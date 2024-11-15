import { busesProp } from "@types";

/**
 *
 * @returns list all the buses that are registered in the system
 */
const allBuses = () => {
  return "SELECT * FROM buses;";
};

/**
 *
 * @param s busProps to obtain bus_company as an id to identify a company
 * @returns a list of all buses that I registered under a company
 */
const busByCompanyId = (s: busesProp) => {
  return `SELECT * from public.buses WHERE bus_company=${s.bus_company};`;
};

/**
 *
 * @param s props that provide the details needed to insert a bus in the database
 * @returns the inserted details of the bus.
 */
const addBus = (s: busesProp) => {
  return `INSERT INTO buses(
            bus_model, plate_number, seat_capacity,bus_company)
            VALUES ( '${s.bus_model}', '${s.plate_number}', '${s.seat_capacity}', '${s.bus_company}') RETURNING *;`;
};

const deleteBus = (s: busesProp) => {
  return `DELETE FROM public.buses WHERE bus_id = ${s.bus_id};`;
};

const updateBus = (s: busesProp) => {
  return `UPDATE public.buses
	SET bus_model='${s.bus_model}', plate_number='${s.plate_number}', seat_capacity=${s.seat_capacity}, bus_company=${s.bus_company}
	WHERE bus_id=${s.bus_id} RETURNING *;`;
};

const busByPlateNumber = (plateNumber: string) => {
  return {
    text: `SELECT * FROM public.buses WHERE "plate_number"=$1`,
    values: [plateNumber],
  };
};

const busById = (busId: string) => {
  return {
    text: `SELECT * FROM public.buses WHERE "bus_id"=$1`,
    values: [busId],
  };
};

export default {
  allBuses,
  busByCompanyId,
  addBus,
  deleteBus,
  updateBus,
  busByPlateNumber,
  busById,
};
