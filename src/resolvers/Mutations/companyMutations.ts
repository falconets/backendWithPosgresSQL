import { GraphQLError } from "graphql";
import { Company, Context } from "@types";

export const companyMutations = {
  registerCompany: async (parent:Company['parent'], args:Company['args'], { db, models }:Context) => {
      try {
            const register = await db.query(models.company.registerCompany(args));
            return register.rows[0];
          } catch (err) {
            throw new GraphQLError("Failed to register the company");
          }
  },
};
