import { BusStopProps } from "@types"
import {tracks} from "../../tables"

const table = tracks.BUS_STOPS
 
 const addBusStop = (s:BusStopProps)=> {
      return `INSERT INTO ${table}("stopName", longitude, latitude, description) 
            VALUES ('${s.stopName}', '${s.latitude}', '${s.longitude}', '${s.description}')`
 }

 const getBusStop = ()=>{
      return `SELECT * FROM ${table}`
 }

export default {
      addBusStop,
      getBusStop,
}