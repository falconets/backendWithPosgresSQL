import { GraphQLError } from "graphql";
import { Company, CompanyProps, Context } from "@types";

export const allCompanies = async (
  parent: Company["parent"],
  args: Company["args"],
  { db, models }: Context
): Promise<CompanyProps[]> => {
  try {
    const companies = await db.query(models.company.allCompanies());
    return companies.rows.slice(0, 99);
  } catch (err) {
    throw new GraphQLError("Failed to return the Companies...");
  }
};
