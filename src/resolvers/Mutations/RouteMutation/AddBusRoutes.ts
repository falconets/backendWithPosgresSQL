import { BusRoutes, BusRoutesProps, Context } from "@types";
import { GraphQLError } from "graphql";

export const addBusRoutes = async (
  parent: BusRoutes["parent"],
  args: BusRoutes["args"],
  { db, models, user }: Context
): Promise<BusRoutesProps> => {
      try{
            const route = await db.query(models.routes.addBusRoutes(args))
            return route.rows[0]
      }catch(error){
            console.log("adding bus route",error)
            throw new GraphQLError("Failed to add the bus routes!")
      }

};
