import dotenv from "dotenv";
import { GraphQLError } from "graphql";
import { User, Context} from "../../type";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();
const JWT_SECRETE = process.env.JWT_SECRETE;

export const userMutations = {
  registerUser: async (
    parent: User["parent"],
    args: User["args"],
    { db, models }: Context
  ) => {
    try {
      const checkUser = await db.query(models.users.checkUser(args));
      if (checkUser?.rows.length < 1 && JWT_SECRETE !== undefined) {
        const register = await db.query(await models.users.registerUser(args));
        console.log(register);

        const expiresInMinutes = 15;
        const expirationTime =
          Math.floor(Date.now() / 1000) + expiresInMinutes * 60;

        const payload = {
          userId: register.rows[0].id,
          exp: expirationTime,
        };

        return `${jwt.sign(payload, JWT_SECRETE)} ${register.rows[0].id}`;
      } else {
        return "Failed to register user, email already registered!";
      }
    } catch (err) {
      throw new GraphQLError("Failed to register the user");
    }
  },
  signIn: async (
    parent: User["parent"],
    args: User["args"],
    { db, models }: Context
  ) => {
    try {
      const checkEmail = await db.query(models.users.checkUser(args));
      if (checkEmail?.rows.length >= 1 && JWT_SECRETE !== undefined) {
        const valid = await bcrypt.compare(
          args.password,
          checkEmail.rows[0].password
        );
        if (!valid) {
          console.log("valid", valid);
          throw new GraphQLError("Error signing in!");
        }

        const expiresInDays = 1;
        const expirationTime =
          Math.floor(Date.now() / 1000) + expiresInDays * 24 * 60 * 60;

        const payload = {
          userId: checkEmail.rows[0].id,
          exp: expirationTime,
        };

        return `${jwt.sign(payload, JWT_SECRETE)} ${checkEmail.rows[0].id}`;
      } else {
        throw new GraphQLError("Error signing in!!");
      }
    } catch (error) {
      throw new GraphQLError("Invalid credentials!!");
    }
  },
  removeUser: async (
    parent: User["parent"],
    args: User["args"],
    { db, models }: Context
  ) => {
    try {
      const user = await db.query(models.users.removeUser(args));
      if (user.rowCount && user.rowCount > 0) return true;
      else return false;
    } catch (error) {
      throw new GraphQLError("Error removing user");
    }
  },
  updateUser: async (
    parent: User["parent"],
    args: User["args"],
    { db, models }: Context
  ): Promise<boolean> => {
    try {
      const user = await db.query(models.users.updateUser(args));
      if(user.rowCount && user.rowCount >= 0)return true;
      else return false
    } catch (error) {
      throw new GraphQLError("Error updating user");

    }
  },
};
