import bookQuery from "./bookQuery"
import companyQuery from "./companyQuery"
import busesQuery from "./busesQuery"

export const Query = {
      ...bookQuery,
      ...companyQuery,
      ...busesQuery
}
