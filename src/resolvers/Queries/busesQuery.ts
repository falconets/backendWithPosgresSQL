import { GraphQLError } from "graphql";
import { Buses, Context } from "../../type";

const Buses = {
  allBuses: async (
    parent: Buses["parent"],
    args: Buses["args"],
    { db, models, user }: Context
  ) => {
    try {
      const buses = await db.query(models.buses.allBuses());
      return buses.rows.slice(0,99);
    } catch (error) {
      throw new GraphQLError("failed to retrieve the list all buses");
    }
  },
  busesByCompany: async (
      parent: Buses["parent"],
      args: Buses["args"],
      { db, models, user }: Context
    ) => {
      try{
            const buses = await db.query(models.buses.busByCompanyId(args))
            console.log(buses)
            return buses.rows.slice(0,99)
      }catch(error){
            throw new GraphQLError("Something went wrong!!!");

      }
    }
};

export default Buses;
