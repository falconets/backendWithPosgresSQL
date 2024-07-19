import { bookMutations } from "./bookMutations";
import { companyMutations } from "./companyMutations";
import { userMutations } from "./userMutations";
import { busesMutation } from "./busesMutation"
import RouteMutation from "./RouteMutation";

export const Mutation = {
  ...bookMutations,
  ...companyMutations,
  ...userMutations,
  ...busesMutation,
  ...RouteMutation,
};
