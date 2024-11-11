import { companyRevenueReportProps } from "@types";

/**
 * To create a query that fetches the number of tickets booked for specific
 *  routes per day in a particular month, you can utilize the tickets table,
 *  which includes fields for routeid, createdAt (timestamp), and other ticket details
 * @param args 
 * @returns 
 */

// SELECT 
//     "routeId",
//     DATE("createdAt") AS booking_date,
//     COUNT("ticketId") AS tickets_booked
// FROM 
//     tickets
// WHERE 
//     EXTRACT(MONTH FROM "createdAt") = '10' AND
//     EXTRACT(YEAR FROM "createdAt") = '2024' AND
// 	"companyId"= 1
// GROUP BY 
//     "routeId", DATE("createdAt")
// ORDER BY 
//     "routeId", booking_date;

const company_total_monthly_revenue_report = (
  args: companyRevenueReportProps
) => {
  const month = new Date(args.date).getMonth() + 1;
  const year = new Date(args.date).getFullYear();
  return {
    text: `
      SELECT 
      EXTRACT(MONTH FROM "createdAt") AS booking_month, 
      COUNT("ticketId") AS total_bookings,
      SUM("amount") AS total_revenue
      FROM 
          public.tickets
      WHERE 
          "companyId" = $1
          AND EXTRACT(YEAR FROM "createdAt") = $3
          AND EXTRACT(MONTH FROM "createdAt") = $2
      GROUP BY 
          booking_month;
    `,
    values: [args.companyId, month, year],
  };
};

const company_total_week_revenue_report = (args: companyRevenueReportProps) => {
  return {
    text: `
      SELECT 
      DATE_TRUNC('week', t."createdAt") AS booking_week, 
      COUNT("ticketId") AS total_bookings,
      SUM("amount") AS total_revenue
      FROM 
          public.tickets t
      WHERE 
          "companyId" = $1
          AND DATE_TRUNC('week', t."createdAt") = DATE_TRUNC('week', $2::DATE)
      GROUP BY 
          booking_week
      ORDER BY 
          booking_week ASC;
    `,
    values: [args.companyId, args.date],
  };
};

/**
 * this return monthly revenue for each day of a given month
 * @param args companyId date
 * @returns booking_date, total_revenue, total_booking
 */
const company_monthly_revenue_report = (args: companyRevenueReportProps) => {
  const month = new Date(args.date).getMonth() + 1;
  const year = new Date(args.date).getFullYear();
  return {
    text: `SELECT 
    DATE("createdAt") AS booking_date, 
    COUNT("ticketId") AS total_bookings,
    SUM("amount") AS total_revenue
    FROM 
        public.tickets
    WHERE 
        "companyId" = $1
        AND EXTRACT(YEAR FROM "createdAt") = $3
        AND EXTRACT(MONTH FROM "createdAt") = $2
    GROUP BY 
        booking_date
    ORDER BY 
        booking_date ASC;`,
    values: [args.companyId, month, year],
  };
};

/**
 * this return revenue for day
 * @param args companyId date
 * @returns booking_date, total_revenue, total_booking
 */
const company_day_revenue_report = (args: companyRevenueReportProps) => {
  return {
    text: `SELECT 
        DATE("createdAt") AS booking_date, 
        COUNT("ticketId") AS total_bookings,
        SUM("amount") AS total_revenue
        FROM 
            public.tickets
        WHERE 
            "companyId" = $1
            AND EXTRACT(YEAR FROM "createdAt") = $3
            AND EXTRACT(MONTH FROM "createdAt") = $2
            AND EXTRACT(DAY FROM "createdAt") = $4
        GROUP BY 
            booking_date
        ORDER BY 
            booking_date ASC;`,
    values: [
      args.companyId,
      new Date(args.date).getMonth() + 1,
      new Date(args.date).getFullYear(),
      new Date(args.date).getDate() + 1,
    ],
  };
};

const list_tickets_by_day = (args: companyRevenueReportProps) => {
  const formattedDate = new Date(args.date).toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'

  return {
    text: `SELECT * FROM public.tickets
    WHERE 
	"companyId"= $1 AND DATE("createdAt") = $2;`,
    values: [args.companyId, formattedDate],
  };
};

const list_tickets_by_week = (args: companyRevenueReportProps) => {
  const formattedDate = new Date(args.date).toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'

  return {
    text: `SELECT * FROM public.tickets
    WHERE "companyId"= $1 AND
      DATE_TRUNC('week', "createdAt") = DATE_TRUNC('week', $2 ::DATE);`,
    values: [args.companyId, formattedDate],
  };
};

const list_tickets_by_month = (args: companyRevenueReportProps) => {
  const formattedDate = new Date(args.date).toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'

  return {
    text: `SELECT * FROM public.tickets
      WHERE "companyId"= $1 AND
        DATE_TRUNC('month', "createdAt") = DATE_TRUNC('month', $2 ::DATE);`,
    values: [args.companyId, formattedDate],
  };
};

const seat_allocation_stats = (busId: number, journeyInstancesId: string) => {
  return {
    text: `SELECT 
	COUNT(s.seat_id) AS total_seats,
	COUNT(CASE WHEN s.is_available = true AND (j.is_booked = false OR j.is_booked IS NULL) THEN 1 END) AS total_available_seats,
    COUNT(CASE WHEN j.is_booked = true THEN 1 END) AS total_booked_seats	
	FROM 
    public.bus_seats s
    LEFT JOIN 
        public.journey_seats j ON s.seat_id = j.seat_id
    WHERE 
        s."busId" = $1 AND j."schedule_id" = $2;`,
    values: [busId, journeyInstancesId],
  };
};

const company_revenue_by_payment_method = (companyId: number) => {
  return {
    text: `SELECT 
    t."paymentMethod", 
    SUM(t.amount) AS total_revenue,
    COUNT(t."ticketId") AS number_of_tickets
    FROM 
        public.tickets t
    WHERE 
        t."companyId"=$1
    GROUP BY 
        t."paymentMethod";`,
    values: [companyId],
  };
};

const company_revenue_payment_method_by_day = (
  companyId: number,
  date: string
) => {
  const formattedDate = new Date(date).toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'

  return {
    text: `
      SELECT 
        t."paymentMethod", 
        SUM(t.amount) AS total_revenue,
        COUNT(t."ticketId") AS number_of_tickets
      FROM 
        public.tickets t
      WHERE 
        t."companyId" = $1
        AND DATE(t."createdAt") = $2
      GROUP BY 
        t."paymentMethod"
    `,
    values: [companyId, formattedDate],
  };
};

const company_revenue_payment_method_by_week = (
  companyId: number,
  date: string
) => {
  const formattedDate = new Date(date).toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'

  return {
    text: `
      SELECT 
        t."paymentMethod", 
        SUM(t.amount) AS total_revenue,
        COUNT(t."ticketId") AS number_of_tickets
      FROM 
        public.tickets t
      WHERE 
        t."companyId" = $1
        AND DATE_TRUNC('week', t."createdAt") = DATE_TRUNC('week', $2 ::DATE)
      GROUP BY 
        t."paymentMethod"
    `,
    values: [companyId, formattedDate],
  };
};

const company_revenue_payment_method_by_month = (
  companyId: number,
  date: string
) => {
  const formattedDate = new Date(date).toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'

  return {
    text: `
      SELECT 
        t."paymentMethod", 
        SUM(t.amount) AS total_revenue,
        COUNT(t."ticketId") AS number_of_tickets
      FROM 
        public.tickets t
      WHERE 
        t."companyId" = $1
        AND DATE_TRUNC('month', t."createdAt") = DATE_TRUNC('month', $2 ::DATE)
      GROUP BY 
        t."paymentMethod"
    `,
    values: [companyId, formattedDate],
  };
};

const company_revenue_payment_method_by_year = (
  companyId: number,
  date: string
) => {
  const formattedDate = new Date(date).toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'

  return {
    text: `
      SELECT 
        t."paymentMethod", 
        SUM(t.amount) AS total_revenue,
        COUNT(t."ticketId") AS number_of_tickets
      FROM 
        public.tickets t
      WHERE 
        t."companyId" = $1
        AND DATE_TRUNC('year', t."createdAt") = DATE_TRUNC('year', $2 ::DATE)
      GROUP BY 
        t."paymentMethod"
    `,
    values: [companyId, formattedDate],
  };
};

const company_revenue_payment_method_by_date_range = (
  companyId: number,
  startDate: string,
  endDate: string
) => {
  const formattedStartDate = new Date(startDate).toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'
  const formattedEndDate = new Date(endDate).toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'
  return {
    text: `
      SELECT 
      t."paymentMethod", 
      SUM(t.amount) AS total_revenue,
      COUNT(t."ticketId") AS number_of_tickets
      FROM 
          public.tickets t
      WHERE 
          t."companyId" = $1
          AND t."createdAt" BETWEEN $2 AND $3 
      GROUP BY 
          t."paymentMethod";
    `,
    values: [companyId, formattedStartDate, formattedEndDate],
  };
};

const bus_seat_occupancy_report = (
  journeyInstanceIds: string[],
  companyId: number
) => {
  const placeholders = journeyInstanceIds
    .map((_, idx) => `$${idx + 1}`)
    .join(", ");
  return {
    text: `SELECT 
      j.schedule_id AS journey_instance_id,
      b.plate_number AS bus_plate_number,
      COUNT(s.seat_id) AS total_seats,
      COUNT(CASE WHEN s.is_available = true AND (j.is_booked = false OR j.is_booked IS NULL) THEN 1 END) AS total_available_seats,
      COUNT(CASE WHEN j.is_booked = true THEN 1 END) AS total_booked_seats
      FROM 
          public.bus_seats s
      LEFT JOIN 
          public.journey_seats j ON s.seat_id = j.seat_id
      JOIN 
          public.buses b ON s."busId" = b.bus_id
      WHERE 
          j."schedule_id" IN (${placeholders})
          AND b."bus_company" = ${companyId}

      GROUP BY 
      		j.schedule_id,
          b.plate_number;`,
    values: journeyInstanceIds,
  };
};

const fetchHourlyTicketSales = (companyId: number, date: string) => {
  const formattedDate = new Date(date).toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'

  return {
    text: `
      SELECT 
      DATE_TRUNC('hour', "createdAt") AS purchase_hour,
      COUNT("ticketId") AS ticket_count,
      SUM(amount) AS total_amount
    FROM 
        public.tickets
    WHERE 
        DATE("createdAt") = $2
        AND "companyId" = $1
    GROUP BY 
        purchase_hour
    ORDER BY 
        purchase_hour;
    `,
    values: [companyId, formattedDate],
  };
};



export default {
  company_monthly_revenue_report,
  company_total_monthly_revenue_report,
  company_total_week_revenue_report,
  company_day_revenue_report,
  company_revenue_payment_method_by_day,
  company_revenue_payment_method_by_week,
  company_revenue_payment_method_by_month,
  company_revenue_payment_method_by_year,
  company_revenue_payment_method_by_date_range,
  list_tickets_by_day,
  list_tickets_by_week,
  list_tickets_by_month,
  seat_allocation_stats,
  company_revenue_by_payment_method,
  bus_seat_occupancy_report,
  fetchHourlyTicketSales,
};
