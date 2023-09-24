import { Query } from "./Queries";
import { Mutation } from "./Mutations";
import { resolverMap } from "./Date";

export const resolvers = {
  Query,
  Mutation,
  DateTime: resolverMap.Date,
};
