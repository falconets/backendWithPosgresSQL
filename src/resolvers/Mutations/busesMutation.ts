import { GraphQLError } from "graphql";
import { Buses, Context } from "@types";

export const busesMutation = {
  createBus: async (
    parent: Buses["parent"],
    args: Buses["args"],
    { models, db, user }: Context
  ) => {
    try {
      const add = await db.query(models.buses.addBus(args));
      console.log(add)
      return add.rows[0];
    } catch (error) {
      console.log("ERROR", error);
      throw new GraphQLError("Failed to Insert the bus");
    }
  },
  deleteBus:async (
      parent: Buses["parent"],
      args: Buses["args"],
      { models, db, user }: Context
    ) => {
      try {
            const del = await db.query(models.buses.deleteBus(args))
            if(del.rowCount && del.rowCount > 0)return true
            else return false
      }catch(error){
            throw new GraphQLError('Something went wrong!!!')
      } 
  },
  updateBus:async (
      parent: Buses["parent"],
      args: Buses["args"],
      { models, db, user }: Context
    ) => {
      try{
            const update = await db.query(models.buses.updateBus(args))
            console.log(update,'update')
            return update.rows[0]
      }catch(error){
            console.log('error', error)
            throw new GraphQLError(`something went wrong`)
      }
    }

};

