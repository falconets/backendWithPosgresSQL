import bookQuery from "./bookQuery"
import userQuery from "./userQuery"
import BusesQueries from "./BusesQueries"
import RouteQueries from "./RouteQueries"
import CompanyQuries from "./CompanyQuries"
import BusScheduleQueries from "./BusScheduleQueries"

export const Query = {
      ...bookQuery,
      ...userQuery,
      ...BusesQueries,
      ...RouteQueries,
      ...CompanyQuries,
      ...BusScheduleQueries,
}
