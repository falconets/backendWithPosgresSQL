import { BusRoutes, BusRoutesProps, Context } from "@types";
import { GraphQLError } from "graphql";

export const getBusRoutesById = async (
  parent: BusRoutes["parent"],
  args: BusRoutes["args"],
  { db, models, user }: Context
): Promise<BusRoutesProps> => {
  try {
    const res = await db.query(models.routes.getBusRoutesById(args))
    return res.rows[0]
  } catch (error) {
    throw new GraphQLError(`${error} `);
  }
};
