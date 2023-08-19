export const Query = {
  books: async (parent, args, { db, models }) => {
    const result = await db.query(models.Book.allBooks());
    return result.rows.slice(0, 99);
  },
};
