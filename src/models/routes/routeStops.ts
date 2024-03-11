import { BusRoutesStopProps } from "@types"
import {tracks} from "../../tables"


const table = tracks.BUS_ROUTES_STOPS

const linkBusRouteStops = (s:BusRoutesStopProps)=>{
 return `INSERT INTO ${table} ("routeId", "stopId", "stopOrder")
            VALUES ('${s.routeId}', '${s.stopId}', ${s.stopOrder})`
}

const getBusRouteStops = (s:BusRoutesStopProps)=>{
      return `SELECT bs.*, "bus_routes_stops".*
      FROM bus_stops bs
      JOIN bus_routes_stops ON bs.id = "bus_routes_stops"."stopId"
      JOIN bus_routes ON "bus_routes_stops"."routeId" = "bus_routes".id
      WHERE "bus_routes".id = '${s.routeId}';`
}

export default {
      linkBusRouteStops,
      getBusRouteStops,
}