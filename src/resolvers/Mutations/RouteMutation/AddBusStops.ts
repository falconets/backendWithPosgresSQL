import { BusStops,Context, BusRoutesStopProps } from "@types";
import { GraphQLError } from "graphql";

export const addBusStops = async (
  parent: BusStops["parent"],
  args: BusStops["args"],
  { db, models, user }: Context
): Promise<BusRoutesStopProps[]> => {
      try{
            console.log(args)
            const routeId = args.routeId as string;
            if(routeId){
                  const busStop = await db.query(models.routes.addBusStop(args))
                  console.log('received data',busStop.rows[0])
                  const stopId = busStop.rows[0].id
                  if(stopId){
                        const getRouteStops= await db.query(models.routes.getBusRouteStops({routeId: routeId}))
                        const tLength = getRouteStops.rowCount as number
                        const routeStop = await db.query(models.routes.addBusRoutesStops({routeId: routeId, stopId: stopId, stopOrder:tLength})) 
                        console.log('Returning data',routeStop.rows[0])
                        return routeStop.rows[0]  
                  }else{
                        console.log('Failed error')
                        throw new Error('Failed  to add the bus stop')
                  }

            }else{
                  console.log('Failed to add the bus stop')
                  throw new Error("issure to provide routeId")
            }
      }catch(error){
            console.log("adding bus route",error)
            throw new GraphQLError("Failed to add the bus routes!")
      }

};
