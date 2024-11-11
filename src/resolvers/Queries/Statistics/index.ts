import { bus_seat_occupancy_report } from "./busSeatOccupancyReport";
import { company_day_revenue_report } from "./companyDayRevenueReport";
import { company_monthly_revenue_report } from "./companyMonthlyRevenueReport";
import { company_revenue_by_payment_method } from "./companyRevenueByPaymentMethod";
import { company_revenue_payment_method_by_day } from "./companyRevenuePaymentMethodByDay";
import { company_revenue_payment_method_by_month } from "./companyRevenuePaymentMethodByMonth";
import { company_revenue_payment_method_by_week } from "./companyRevenuePaymentMethodByWeek";
import { company_revenue_payment_method_by_year } from "./companyRevenuePaymentMethodByYear";
import { company_total_monthly_revenue_report } from "./companyTotalMonthlyRevenueReport";
import { company_total_week_revenue_report } from "./companyTotalWeekRevenueReport";
import { fetchHourlyTicketSales } from "./fetchHourlyTicketSales";
import { list_tickets_by_day } from "./listTicketsByDay";
import { list_tickets_by_month } from "./listTicketsByMonth";
import { list_tickets_by_week } from "./listTicketsByWeek";
import { seat_allocation_stats } from "./seatAllocationStats";

export default {
  company_monthly_revenue_report,
  company_day_revenue_report,
  company_total_monthly_revenue_report,
  company_total_week_revenue_report,
  company_revenue_payment_method_by_day,
  company_revenue_payment_method_by_month,
  company_revenue_payment_method_by_year,
  company_revenue_payment_method_by_week,
  list_tickets_by_day,
  list_tickets_by_week,
  list_tickets_by_month,
  seat_allocation_stats,
  company_revenue_by_payment_method,
  bus_seat_occupancy_report,
  fetchHourlyTicketSales
};
