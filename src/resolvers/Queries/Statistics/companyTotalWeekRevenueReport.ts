import {
    companyRevenueReport,
    companyRevenueReportType,
    Context,
  } from "@types";
  import { GraphQLError } from "graphql";
  
  export const company_total_week_revenue_report = async (
    parent: companyRevenueReportType["parent"],
    args: companyRevenueReportType["args"],
    { models, db }: Context
  ): Promise<companyRevenueReport> => {
    try {
      const res = await db.query(
        models.statistic.company_total_week_revenue_report(args)
      );
      console.log('test',res.rows)
      const data = {
        booking_date: args.date,
        total_revenue: res.rows[0].total_revenue,
        total_bookings: res.rows[0].total_bookings,
      }
      return data;
    } catch (error) {
      throw new GraphQLError("something wrong happened!");
    }
  };
  