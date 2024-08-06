import { BusRoutesStopProps, BusStopProps } from "@types"
import {tracks} from "../../tables"

const table = tracks.BUS_STOPS
const table2 = tracks.BUS_ROUTES_STOPS
 
 const addBusStop = (s:BusStopProps)=> {
      return `INSERT INTO ${table}("stopName", longitude, latitude, description, companyid) 
            VALUES ('${s.stopName}', '${s.latitude}', '${s.longitude}', '${s.description}', '${s.companyid}') RETURNING *;`
 }

 const addBusRoutesStops = (s:BusRoutesStopProps)=>{
      return `INSERT INTO ${table2}("routeId", "stopId", "stopOrder")
            VALUES ('${s.routeId}', '${s.stopId}', ${s.stopOrder}) RETURNING *;`
 }

 const getBusStop = (s:BusStopProps)=>{
      return `SELECT * FROM ${table} WHERE companyid='${s.companyid}'`
 }

export default {
      addBusStop,
      getBusStop,
      addBusRoutesStops
}