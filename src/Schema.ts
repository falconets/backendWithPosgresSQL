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
    saleId: ID!
    customerId: String!
    busId: String!
    routeId: String!
    saleAmount: String!
    saleDateTime: DateTime
    status: String!
  }

  type Payments{
    id: ID!
    saleId: ID!
    paymentAmount: String!
    dateTime: DateTime
    paymentMethod: String!
    bus_company: String
    status: String!
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
    companyId: Int
    busId: String
    date: DateTime
    time: String
    routeId: String
    tickets: Int
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

    #Ticket queries
    allTickets: [Tickets!]
    ticketById(saleId:ID!): Tickets
    ticketsByBusAndRoute(busId:String!,routeId:String!):[Tickets]

    #Payments queries
    allpayments:[Payments!]
    paymentsById(id:ID!): Payments
    paymentsByCompany(bus_company:String!): Payments

    #Routes queries
    getBusRoutes: [BusRoutes]
    getBusStops(companyid:String): [BusStops]
    getBusRoutesStops(routeId:String!): [BusStops]
    

    #Schedules queries
    getBusSchedules: [BusSchedules]
    getBusScheduleByDate(date: DateTime!): [BusSchedules]
    getBusScheduleByCompanyId(company_id:Int!): [BusSchedules]
    getBusScheduleByRouteId(route_id:String!): [BusSchedules]
   # getScheduleByBusId(bus_id:String!): [BusSchedules]
    
  }

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

    #tickets mutations
    bookTicket(customerId: String!, busId: String!, routeId: String!, saleAmount: String!, status: String): Tickets
    updateTicket(busId:String, routeId: String!, saleAmount: String!, status: String): Tickets
    removeTicket(saleId:ID!): Boolean

    #Payments mutations
    makePayment(saleId: String!, paymentAmount: String!, paymentMethod: String!, bus_company: String, status: String!): Payments
    updatePayment(status: String, paymentAmount: String!, paymentMethod: String!): Payments
    removePayment(paymentId: ID!):Boolean


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
    addBusSchedule(companyId: Int!, busId: String!, date: DateTime!, time: String!, routeId: String!, tickets: Int!): BusSchedules
    deleteBusSchedule(id:String): Boolean
    updateBusSchedule(id:String!, date: DateTime, time: String, routeId: String, tickets: Int): BusSchedules
    
  }
`;
