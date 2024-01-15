import dotenv from "dotenv";
import { tokenProp } from "@types";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRETE = process.env.JWT_SECRETE;

export const verifyToken = (t: tokenProp) => {
  if (t.token && JWT_SECRETE !== undefined) {
    try {
      //return the user information from the token
      return jwt.verify(t.token, JWT_SECRETE);
    } catch (err) {
      //if there's a problem with the token, throw am error
      throw new Error("Session invalid!!!");
    }
  } else {
    return null;
  }
};
