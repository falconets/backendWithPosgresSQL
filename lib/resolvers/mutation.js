"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const graphql_1 = require("graphql");
exports.Mutation = {
    addBook: async (parent, args, { db, models }) => {
        try {
            const docRef = await db.query(models.Book.addBook(args));
            return docRef.rows[0];
        }
        catch (error) {
            throw new graphql_1.GraphQLError("failed to add the book in the database");
        }
    },
    deleteBook: async (parent, args, { db, models }) => {
        try {
            await db.query(models.Book.deleteBook(args));
            return true;
        }
        catch (error) {
            return false;
        }
    },
    updateBook: async (parent, args, { db, models }) => {
        try {
            const update = await db.query(models.Book.updateBook(args));
            return update.rows[0];
        }
        catch (error) {
            throw new graphql_1.GraphQLError("Failed to updated the data");
        }
    }
};
//# sourceMappingURL=mutation.js.map