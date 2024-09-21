import { GraphQLError } from "graphql";
import { Buses, busesProp, Context } from "@types";

export const busById = async (
  parent: Buses["parent"],
  args: Buses["args"],
  { db, models, user }: Context
): Promise<busesProp>  => {
  try {
    const buses = await db.query(models.buses.busById(args.bus_id as string));
    return buses.rows[0]
  } catch (error) {
    throw new GraphQLError("failed to retrieve the buses");
  }
};
