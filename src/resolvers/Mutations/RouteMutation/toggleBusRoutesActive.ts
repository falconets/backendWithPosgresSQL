import { BusRoutes, BusRoutesProps, Context } from "@types";
import { GraphQLError } from "graphql";

export const toggleBusRoutesActive = async (
  parent: BusRoutes["parent"],
  args: BusRoutes["args"],
  { db, models, user }: Context
): Promise<BusRoutesProps> => {
      try{
            if(user){
                  const toggle = await db.query(models.routes.toggleBusRoutesActive(args))
                  return toggle.rows[0]
            }else{
                  throw new Error("Unauthorized")
            }
      }catch(error){
            throw new GraphQLError(`${error} `)
      }

};
