import { BusRoutesStopProps } from "@types"
import {tracks} from "../../tables"


const table = tracks.BUS_ROUTES_STOPS

const linkBusRouteStops = (s:BusRoutesStopProps)=>{
 return `INSERT INTO ${table} ("routeId", "stopId", "stopOrder")
            VALUES ('${s.routeId}', '${s.stopId}', ${s.stopOrder})`
}

const getBusRouteStops = ()=>{
      return `SELECT * FROM ${table}`
}

export default {
      linkBusRouteStops,
      getBusRouteStops,
}