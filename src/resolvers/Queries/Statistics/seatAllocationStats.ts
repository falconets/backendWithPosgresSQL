import {
    Context,
    seatAllocationStatsProps,
    seatAllocationStatsType,
  } from "@types";
  import { GraphQLError } from "graphql";
  
  export const seat_allocation_stats = async (
    parent: seatAllocationStatsType["parent"],
    args: seatAllocationStatsType["args"],
    { models, db }: Context
  ): Promise<seatAllocationStatsProps> => {
    try {
      const res = await db.query(
        models.statistic.seat_allocation_stats(args.busId,args.journeyInstanceId)
      );
      return res.rows[0];
    } catch (error) {
      throw new GraphQLError("something wrong happened!");
    }
  };
  