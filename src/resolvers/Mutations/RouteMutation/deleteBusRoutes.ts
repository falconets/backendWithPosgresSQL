import { BusRoutes, Context } from "@types";
import { GraphQLError } from "graphql";

export const deleteBusRoutes = async (
  parent: BusRoutes["parent"],
  args: BusRoutes["args"],
  { db, models, user }: Context
): Promise<Boolean> => {
  try {
    if (user) {
      const del = await db.query(models.routes.deleteBusRoutes(args));
      if (del.rowCount && del.rowCount > 0) return true;
      else return false;
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    throw new GraphQLError(`${error} `);
  }
};
