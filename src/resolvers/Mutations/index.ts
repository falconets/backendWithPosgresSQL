import { bookMutations } from "./bookMutations";
import { companyMutations } from "./companyMutations";
import { userMutations } from "./userMutations";

export const Mutation = {
  ...bookMutations,
  ...companyMutations,
  ...userMutations,
};
