import bookQuery from "./bookQuery"
import userQuery from "./userQuery"
import BusesQueries from "./BusesQueries"
import RouteQueries from "./RouteQueries"
import CompanyQuries from "./CompanyQuries"
import BusScheduleQueries from "./BusScheduleQueries"
import ticketQuery from "./BusTicketsQueries"
import BusSeats from "./BusSeats"
import JourneySeats from "./JourneySeats"
import JourneyInstances from "./JourneyInstances"

export const Query = {
      ...bookQuery,
      ...userQuery,
      ...BusesQueries,
      ...RouteQueries,
      ...CompanyQuries,
      ...BusScheduleQueries,
      ...ticketQuery,
      ...BusSeats,
      ...JourneySeats,
      ...JourneyInstances
}
