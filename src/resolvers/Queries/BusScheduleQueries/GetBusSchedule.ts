import { BusSchedule, BusScheduleProps, Context } from "@types";
import { GraphQLError } from "graphql";

export const getBusSchedules = async (
    parent: BusSchedule["parent"],
    args: BusSchedule["args"],
    { models, firestore }: Context
  ): Promise<BusScheduleProps[]> => {
        try{
              const res = await models.schedules.getBusSchedules(firestore, 'bus_schedules')
            
              return res as BusScheduleProps[]
        }catch(error){
              console.log("Failed to return the bus schedule",error)
              throw new GraphQLError("Failed to return the bus schedule!")
        }
  
  };