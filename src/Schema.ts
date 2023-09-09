
export const typeDefs = `#graphql
  scalar DateTime

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID!
    title: String
    author: String
    store:String
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
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]!
    oneBook(id:String!): Book

    #Company queries
    allCompanies: [Company]!
  }

  # The "Mutation" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Mutation{
    addBook(title: String, author: String, store:String): Book
    deleteBook(id:String): Boolean
    updateBook(id:String!, store:String!): Book

    #Company mutation
    registerCompany(company_name: String!, phone_number:String!, email: String!, 
        physical_address: String!, province: String!, bank_details:String!):Company
  }
`;
