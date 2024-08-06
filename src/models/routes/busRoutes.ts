import { BusRoutesProps } from "@types";
import {tracks} from "../../tables"

const table = tracks.BUS_ROUTES;


const addBusRoutes = (s: BusRoutesProps) => {
  return `INSERT INTO ${table}
      ("companyId", "routeName", "distanceInKm", "durationInHours", 
      "startLocation", "endLocation", active, price)
            VALUES (${s.companyId}, '${s.routeName}', ${s.distanceInKm}, ${s.durationInHours}, 
            '${s.startLocation}', '${s.endLocation}', '${s.active}', ${s.price}) RETURNING *;`;
};

const toggleBusRoutesActive = (s:BusRoutesProps)=>{
  return `UPDATE ${table} SET active='${s.active}' WHERE id='${s.id}'`;
}

const getBusRoutesById = (s:BusRoutesProps) => {
  return `SELECT * FROM ${table} WHERE id='${s.id}'`;
}

const deleteBusRoutes = (s:BusRoutesProps)=>{
  return `DELETE FROM ${table} WHERE id='${s.id}'`;
}

const getBusRoutes = () => {
  return `SELECT * FROM ${table}`;
};


export default {
  addBusRoutes,
  getBusRoutes,
  toggleBusRoutesActive,
  deleteBusRoutes,
  getBusRoutesById,
};
