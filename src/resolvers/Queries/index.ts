import bookQuery from "./bookQuery"
import companyQuery from "./companyQuery"
import busesQuery from "./busesQuery"
import userQuery from "./userQuery"

export const Query = {
      ...bookQuery,
      ...companyQuery,
      ...busesQuery,
      ...userQuery,
}
