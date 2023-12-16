import { GraphQLError } from "graphql";
import { Context, User, UserProps } from "@types";

const userQuery = {
  allusers: async (
    parent: User["parent"],
    args: User["args"],
    { db, models }: Context
  ): Promise<UserProps[]> => {
    try {
      const users = await db.query(models.users.allUsers());
      return users.rows;
    } catch (error) {
      throw new GraphQLError("Failed to retrieve users!");
    }
  },
  companyUsers: async (
    parent: User["parent"],
    args: User["args"],
    { db, models }: Context
  ): Promise<UserProps[]> => {
    try {
      const users = await db.query(models.users.companyUsers(args));
      return users.rows;
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Failed to retrieve users!");
    }
  },
  userById: async (
    parent: User["parent"],
    args: User["args"],
    { db, models }: Context
  ): Promise<UserProps> => {
    try {
      const user = await db.query(models.users.userById(args));
      return user.rows[0];
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Failed to retrieve user!");
    }
  },
};

export default userQuery;
