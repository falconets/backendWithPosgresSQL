import { Query } from "./query";
import { Mutation } from "./mutation";
import { resolverMap } from "./Date";

export const resolvers = {
  Query,
  Mutation,
  DateTime: resolverMap.Date,
};
