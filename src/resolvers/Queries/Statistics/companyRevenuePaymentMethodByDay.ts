import {
    companyRevenueReportType,
    companyRevenueByPaymnentMethodProp,
    companyRevenueByPaymnentMethodType,
    Context,
  } from "@types";
  import { GraphQLError } from "graphql";
  
  export const company_revenue_payment_method_by_day = async (
    parent: companyRevenueReportType["parent"],
    args: companyRevenueByPaymnentMethodType["args"],
    { models, db }: Context
  ): Promise<companyRevenueByPaymnentMethodProp[]> => {
    try {
      const res = await db.query(
        models.statistic.company_revenue_payment_method_by_day(args.companyId, args.date as string)
      );
      console.log(res.rows);
      return res.rows[0];
    } catch (error) {
        console.log(error)
      throw new GraphQLError("something wrong happened!");
    }
  };
  