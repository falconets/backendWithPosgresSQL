import { GraphQLError } from "graphql";
import { Book, Context } from "@types";

export const bookMutations = {
  addBook: async (
    parent: Book["parent"],
    args: Book["args"],
    { db, models, user }: Context
  ) => {
    console.log(parent)
    try {
      if (user == null) {
        throw new Error("user not login in!");
      }
      const docRef = await db.query(models.Book.addBook(args));
      return docRef.rows[0];
    } catch (error) {
      throw new GraphQLError("failed to add the book in the database");
    }
  },
  deleteBook: async (
    parent: Book["parent"],
    args: Book["args"],
    { db, models }: Context
  ) => {
    try {
      await db.query(models.Book.deleteBook(args));
      return true;
    } catch (error) {
      return false;
    }
  },
  updateBook: async (
    parent: Book["parent"],
    args: Book["args"],
    { db, models }: Context
  ) => {
    try {
      const update = await db.query(models.Book.updateBook(args));
      return update.rows[0];
    } catch (error) {
      throw new GraphQLError("Failed to updated the data");
    }
  },
};
