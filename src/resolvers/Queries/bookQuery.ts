import { GraphQLError } from "graphql";
import { Book, Context } from "@types";

export const bookQuery = {
  books: async (
    parent: Book["parent"],
    args: Book["args"],
    { db, models }: Context
  ) => {
    const result = await db.query(models.Book.allBooks());
    return result.rows.slice(0, 99);
  },
  oneBook: async (
    parent: Book["parent"],
    args: Book["args"],
    { db, models }: Context
  ) => {
    try {
      const result = await db.query(models.Book.findBook(args));
      return result.rows[0];
    } catch (error) {
      throw new GraphQLError("The book not found!");
    }
  },
};

export default bookQuery;
