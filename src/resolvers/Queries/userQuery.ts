import { GraphQLError } from "graphql";
import { Context, User } from "../../type";

const userQuery = {
  allusers: async (
    parent: User["parent"],
    args: User["args"],
    { db, models }: Context
  ) => {
      try{
            const users = await db.query(models.users.allUsers())
            return users.rows
      }catch(error){
            throw new GraphQLError("Failed to retrieve users!")
      }
  },
  companyUsers: async (
      parent: User["parent"],
      args: User["args"],
      { db, models }: Context
    ) => {
      try{
            const users = await db.query(models.users.companyUsers(args))
            return users.rows
      }catch(error){
            console.log(error)
            throw new GraphQLError("Failed to retrieve users!")
      }
    },
};

export default userQuery;
