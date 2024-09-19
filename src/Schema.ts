export const typeDefs = `#graphql
  scalar DateTime
  scalar Upload

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID!
    title: String
    author: String
    store:String
  }

  type Buses{
    bus_id:ID
    bus_model: String
    plate_number: String
    seat_capacity: Int
    bus_company:Int
  }

  # The is company data specification
  type Company{
    companyid: ID!
    company_name: String!
    phone_number: String!
    email: String!
    physical_address: String
    province: String!
    created_at: DateTime
    updated_at:DateTime
    bank_details: String
    logo: String
  }

  #The data type for user for this company
  type users{
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    phone_number: String
    type: String!
    gender: String!
    password:String
    created_at: DateTime
    updated_at: DateTime
    bus_company_id: Int,
    is_email_verified: Boolean
    avatar: String
  }

  type Tickets{
   companyId: ID!
   ticketId: ID!
   passengerName: String!
   seatNumber: String!
   phone: String
   amount: Int! 
   numberOfTickets: Int
   createdAt: String
   updatedAt: String
   routeId: ID!
   bookingReference: String
   passengerEmail: String!
    paymentMethod: String!
    financialTransactionId: String!
    externalId: String!
    currency: String!
    partyIdType: String!
    partyId: String!
    payerMessage: String!
    payeeNote: String!
    status: String!
   created_by: String
   updated_by: String
  }

  type BusRoutes{
    id: ID!
    companyId: Int!
    routeName: String
    distanceInKm: Int
    durationInHours: Int
    startLocation: String
    endLocation: String
    active: Boolean
    price: Int
    createdAt: DateTime
    updatedAt: DateTime
  }

  type BusStops{
    id: ID!
    companyid: Int
    stopName: String
    latitude: String
    longitude: String
    description: String
    createdAt: DateTime
    updatedAt: DateTime
    route: BusRoutesStops
  }

  type BusRoutesStops{
    routeId: String
    stopId: String
    stopOrder: Int
    createdAt: DateTime
    updatedAt: DateTime
  }
  
  type BusSchedules{
    id: ID!
    companyId: Int!
    busPlateNumber: String!
    start: DateTime!
    end: DateTime!
    routeId: String
    tickets: Int
    description: String
    background: String
    borderColor: String
    recurrenceRule: String
    recurrenceExceptions: String
  }

  type BusSeats{
    seat_id:ID
    bus_id: Int
    seatNumber: String
    seatType: String
    is_available: Boolean
    row:Int
    col:Int
    aisleColumn: Int
    createdAt: DateTime
    updatedAt: DateTime
  }

  type RouteSeats{
    id: ID!
    schedule_id: String!
    seat_id: ID!
    is_booked: Boolean
    booking_id: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type JourneyInstances{
    id: ID!
    scheduleId: String!
    companyId: String!
    journeyDate: DateTime
    startTime: DateTime
    endTime: DateTime
    busId: String
    routeId: String
    createdAt: DateTime
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]!
    oneBook(id:String!): Book

    #Company queries
    allCompanies: [Company]

    #Users queries
    allusers:[users]!
    companyUsers(bus_company_id:Int!): [users]!
    userById(id:Int): users

    #Buses queries
    allBuses:[Buses!],
    busesByCompany(bus_company:Int!):[Buses]
    busByPlateNumber(plate_number:String!):Buses


    #Routes queries
    getBusRoutes: [BusRoutes]
    getBusStops(companyid:String): [BusStops]
    getBusRoutesStops(routeId:String!): [BusStops]
    getBusRoutesById(id: String!): BusRoutes
    

    #Schedules queries
    getBusSchedules: [BusSchedules]
    getBusScheduleByDate(start: DateTime!): [BusSchedules]
    getBusScheduleByCompanyId(company_id:Int!): [BusSchedules]
    getBusScheduleByRouteId(route_id:String!): [BusSchedules]
   # getScheduleByBusId(busPlateNumber:String!): [BusSchedules]


   #Tickets queries
   getTickets: [Tickets]
   getTicketsByStatus(status: String!): [Tickets]
   getTicketsByDate(date: DateTime!): [Tickets]
   getTicketsById(id: String!): Tickets
   getTicketsByCompanyId(company_id:Int!): [Tickets]

   #Bus Seats queries
   getSeatsByBusId(busId:String!): [BusSeats]
   getSeatsById(seatId:String!): [BusSeats]

   #Journey Seats queries
   getJourneySeatsByScheduleId(schedule_id:String!): [RouteSeats]
   getSeatById(seat_id:String!): RouteSeats
   getJourneySeatsById(id:String!): [RouteSeats]

   #Journey Instances queries
   getJourneyInstancesByScheduleId(scheduleId:String!): [JourneyInstances]
   getJourneyInstancesByDate(date: DateTime!): [JourneyInstances]
   getJourneyInstancesById(id:String!): [JourneyInstances]
   getJourneyInstancesByBusId(busPlateNumber:String!): [JourneyInstances]
   getJourneyInstancesByRouteId(routeId:String!): [JourneyInstances]

  }#end of Query type definitions

  # The "Mutation" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Mutation{
    addBook(title: String, author: String, store:String): Book
    deleteBook(id:String): Boolean
    updateBook(id:String!, store:String!): Book

    #Company mutation
    registerCompany(company_name: String!, phone_number:String!, email: String!, 
        physical_address: String!, province: String!, bank_details:String!, logo: String):Company


    #users mutations
    registerUser(first_name: String!,last_name: String!,type: String!, gender: String!,
       email: String!, phone_number:String,password:String!,bus_company_id:String,
       avatar: String, is_email_verified: Boolean!): String!
    signIn(email:String!, password: String!): String!
    updateUser(id:Int!, email:String, type:String, first_name:String, last_name:String, phone_number:String, avatar:String, is_email_verified: Boolean): users
    removeUser(id:String!): Boolean


    #buses mutations
    createBus(bus_model:String!,plate_number:String!,seat_capacity:Int!, bus_company:Int!): Buses
    deleteBus(bus_id:Int!): Boolean
    updateBus(bus_model:String!,plate_number:String!,seat_capacity:Int!, bus_company:Int!, bus_id:Int): Buses


    #Routes mutations
    addBusRoutes(companyId: Int!, routeName: String, distanceInKm: Int,
      durationInHours: Int, startLocation: String,  endLocation: String,
      active: Boolean, price: Int): BusRoutes
    toggleBusRoutesActive(id:String!, active: Boolean!): BusRoutes
    deleteBusRoutes(id:String): Boolean

    #Bus stops
    addBusStops(stopName: String!, latitude: String, longitude: String,
      description: String, companyid: Int!, routeId: String!): BusRoutesStops! 
    deleteBusStop(busStopId:String!): Boolean
    updateBusStop(busStopId:String!,latitude:String, longitude: String, description: String): BusStops

    addBusRoutesStops(routeId: String, stopId: String, stopOrder: Int): BusRoutesStops


    #Schedules mutations
    addBusSchedule(companyId: Int!, busPlateNumber: String!, start: String!, end: String!, routeId: String!, tickets: Int!,
        description:String, background:String, borderColor:String, recurrenceRule:String, recurrenceExceptions:String): BusSchedules
    deleteBusSchedule(id:String!): Boolean
    updateBusSchedule(id:String!, start: String, end: String, description:String, recurrenceRule:String,
     recurrenceExceptions:String, tickets: Int): BusSchedules


    #Tickets mutations
    bookTicket(companyId: Int!, passengerName:String!,seatNumber: String!, amount:Int!, routeId: String!, created_by:String, updated_by:String,
     passengerEmail: String!,paymentMethod:String!, currency:String!, partyIdType: String!, partyId: String!,
      payerMessage: String!, payeeNote: String!,
     numberOfTickets:Int!, phone:String): Tickets


     #Bus seats mutations
     addBusSeats(busId:Int!, seatNumber:String!, seatType: String!, is_available: Boolean!, row:Int!, col:Int!, aisleColumn:Int!): BusSeats
     deleteBusSeats(busId:String!): Boolean
     updateBusSeat(seat_id:String!, seatNumber:String!, seatType: String!, is_available: Boolean!, row:Int!, col:Int!): BusSeats
    
  }
`;
