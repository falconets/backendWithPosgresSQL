import {
    companyRevenueReportType,
    Context,
  } from "@types";
  import { GraphQLError } from "graphql";

  interface FetchTicketSales{
    purchase_hour: string;
    ticket_count: number;
    total_amount: number;
  }
  
  export const fetchHourlyTicketSales = async (
    parent: companyRevenueReportType["parent"],
    args: companyRevenueReportType["args"],
    { models, db }: Context
  ): Promise<FetchTicketSales[]> => {
    try {
      const res = await db.query(
        models.statistic.fetchHourlyTicketSales(args.companyId, args.date)
      );
        const data = convertTimestamps(res.rows);
      return data;
    } catch (error) {
        console.error(error);
      throw new GraphQLError("something wrong happened!");
    }
  };

  function convertTimestamps(data:FetchTicketSales[]) {
    return data.map(item => {
      const date = new Date(item.purchase_hour);
      const formattedDate = date.toISOString().slice(0, 16).replace('T', ' '); // Format to "YYYY-MM-DD HH:mm"
      
      return {
        ...item,
        purchase_hour: formattedDate
      };
    });
  }
  