import { BusRoutesProps } from "@types";
import {tracks} from "../../tables"

const table = tracks.BUS_ROUTES;


const addBusRoutes = (s: BusRoutesProps) => {
  return `INSERT INTO ${table}
      ("companyId", "routeName", "distanceInKm", "durationInHours", 
      "startLocation", "endLocation", active, price)
            VALUES (${s.companyId}, '${s.routeName}', ${s.distanceInKm}, ${s.durationInHours}, 
            '${s.startLocation}', '${s.endLocation}', '${s.active}', ${s.price});`;
};

const getBusRoutes = () => {
  return `SELECT id, "companyId", "routeName", "distanceInKm",
            "startLocation", "endLocation", active, price,"createdAt", "updatedAt"
            FROM ${table}`;
};

export default {
  addBusRoutes,
  getBusRoutes,
};
