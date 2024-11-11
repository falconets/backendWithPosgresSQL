import dotenv from "dotenv";
import { GraphQLError } from "graphql";
import { User, Context} from "@types";
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
      console.log(checkUser.rowCount);
      console.log("args", args)
    
      if (checkUser.rowCount === 0 && typeof JWT_SECRETE !== 'undefined') {
        const register = await db.query(await models.users.registerUser(args));
        console.log(register);
    
        const expiresInMinutes = 15;
        const expirationTime = Math.floor(Date.now() / 1000) + expiresInMinutes * 60;
    
        const payload = {
          userId: register.rows[0].id,
          exp: expirationTime,
        };
    
        const token = jwt.sign(payload, JWT_SECRETE);
        return `${token} ${register.rows[0].id}`;
      } else {
        return "Failed to register user, email already registered!";
      }
    } catch (err) {
      console.log(err)
      throw new GraphQLError("Failed to register the user");
    }
    
  },
  signIn: async (
    parent: User["parent"],
    args: User["args"],
    { db, models, res }: Context
  ) => {
    try {
      const checkEmail = await db.query(models.users.checkUser(args));
      if (checkEmail?.rows.length >= 1 && JWT_SECRETE !== undefined) {
        const valid = await bcrypt.compare(
          args.password,
          checkEmail.rows[0].password
        );
        if (!valid) {
          throw new GraphQLError("Invalid credentials");
        }
  
        const expiresInDays = 1;
        const expirationTime = Math.floor(Date.now() / 1000) + expiresInDays * 24 * 60 * 60;
  
        const payload = {
          userId: checkEmail.rows[0].id,
          exp: expirationTime,
        };
  
        const token = jwt.sign(payload, JWT_SECRETE);
  
        // Set the token in an HTTP-only cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: true, //process.env.NODE_ENV === "production",
          sameSite: "None",//"Strict",
          maxAge: expiresInDays * 24 * 60 * 60 * 1000, // 1 day
        });
  
        console.log("Token set in HTTP-only cookie");
  
        return JSON.stringify({
          message: "Login successful",
          userId: checkEmail.rows[0].id,
        });
      } else {
        throw new GraphQLError("Error signing in!");
      }
    } catch (error) {
      console.error("Error in signIn:", error);
      throw new GraphQLError("Invalid credentials");
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
