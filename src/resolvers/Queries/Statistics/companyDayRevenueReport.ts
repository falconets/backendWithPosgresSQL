import {
    companyRevenueReport,
    companyRevenueReportType,
    Context,
  } from "@types";
  import { GraphQLError } from "graphql";
  
  export const company_day_revenue_report = async (
    parent: companyRevenueReportType["parent"],
    args: companyRevenueReportType["args"],
    { models, db }: Context
  ): Promise<companyRevenueReport[]> => {
    try {
      const res = await db.query(
        models.statistic.company_day_revenue_report(args)
      );
      return res.rows;
    } catch (error) {
      throw new GraphQLError("something wrong happened!");
    }
  };
  