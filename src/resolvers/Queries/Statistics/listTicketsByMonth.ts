import {
    companyRevenueReportType,
    Context,
    Tickets,
  } from "@types";
  import { GraphQLError } from "graphql";
  
  export const list_tickets_by_month = async (
    parent: companyRevenueReportType["parent"],
    args: companyRevenueReportType["args"],
    { models, db }: Context
  ): Promise<Tickets[]> => {
    try {
      const res = await db.query(
        models.statistic.list_tickets_by_month(args)
      );
      return res.rows;
    } catch (error) {
      throw new GraphQLError("something wrong happened!");
    }
  };
  