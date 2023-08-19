"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const graphql_1 = require("graphql");
exports.Query = {
    books: async (parent, args, { db, models }) => {
        const result = await db.query(models.Book.allBooks());
        return result.rows.slice(0, 99);
    },
    oneBook: async (parent, args, { db, models }) => {
        try {
            const result = await db.query(models.Book.findBook(args));
            return result.rows[0];
        }
        catch (error) {
            throw new graphql_1.GraphQLError("The book not found!");
        }
    }
};
//# sourceMappingURL=query.js.map