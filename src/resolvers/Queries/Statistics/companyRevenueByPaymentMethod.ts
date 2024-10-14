import {
    companyRevenueReportType,
    companyRevenueByPaymnentMethodProp,
    companyRevenueByPaymnentMethodType,
    Context,
  } from "@types";
  import { GraphQLError } from "graphql";
  
  export const company_revenue_by_payment_method = async (
    parent: companyRevenueReportType["parent"],
    args: companyRevenueByPaymnentMethodType["args"],
    { models, db }: Context
  ): Promise<companyRevenueByPaymnentMethodProp[]> => {
    try {
      const res = await db.query(
        models.statistic.company_revenue_by_payment_method(args.companyId)
      );
      return res.rows;
    } catch (error) {
      throw new GraphQLError("something wrong happened!");
    }
  };
  