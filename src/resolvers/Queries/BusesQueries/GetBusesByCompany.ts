import { GraphQLError } from "graphql";
import { Buses, busesProp, Context } from "@types";

export const busesByCompany = async (
  parent: ["parent"],
  args: Buses["args"],
  { db, models, user }: Context
): Promise<busesProp[]> => {
  try {
    const buses = await db.query(models.buses.busByCompanyId(args));
    return buses.rows.slice(0, 99);
  } catch (error) {
    throw new GraphQLError("Something went wrong!!!");
  }
};
