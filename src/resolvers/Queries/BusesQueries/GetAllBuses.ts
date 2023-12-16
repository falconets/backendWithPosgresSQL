import { GraphQLError } from "graphql";
import { Buses, busesProp, Context } from "@types";

export const allBuses = async (
  parent: Buses["parent"],
  args: Buses["args"],
  { db, models, user }: Context
): Promise<busesProp[]>  => {
  try {
    const buses = await db.query(models.buses.allBuses());
    return buses.rows.slice(0, 99);
  } catch (error) {
    throw new GraphQLError("failed to retrieve the list all buses");
  }
};
