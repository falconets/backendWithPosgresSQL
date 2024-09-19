import { GraphQLError } from "graphql";
import { Buses, busesProp, Context } from "@types";

export const busByPlateNumber = async (
  parent: Buses["parent"],
  args: Buses["args"],
  { db, models, user }: Context
): Promise<busesProp>  => {
  try {
    const buses = await db.query(models.buses.busByPlateNumber(args.plate_number as string));
    return buses.rows[0]
  } catch (error) {
    throw new GraphQLError("failed to retrieve the buses");
  }
};
