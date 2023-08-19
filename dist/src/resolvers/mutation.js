"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const graphql_1 = require("graphql");
exports.Mutation = {
    addBook: (parent, args, { db, models }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const docRef = yield db.query(models.Book.addBook(args));
            return docRef.rows[0];
        }
        catch (error) {
            throw new graphql_1.GraphQLError("failed to add the book in the database");
        }
    }),
    deleteBook: (parent, args, { db, models }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield db.query(models.Book.deleteBook(args));
            return true;
        }
        catch (error) {
            return false;
        }
    }),
    updateBook: (parent, args, { db, models }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const update = yield db.query(models.Book.updateBook(args));
            return update.rows[0];
        }
        catch (error) {
            throw new graphql_1.GraphQLError("Failed to updated the data");
        }
    })
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0YXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmVzb2x2ZXJzL211dGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFzQztBQUd6QixRQUFBLFFBQVEsR0FBRztJQUNsQixPQUFPLEVBQUUsQ0FBTyxNQUFxQixFQUFFLElBQWlCLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFVLEVBQUMsRUFBRTtRQUM3RSxJQUFHO1lBQ0csTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDeEQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQzFCO1FBQUEsT0FBTSxLQUFLLEVBQUM7WUFDUCxNQUFNLElBQUksc0JBQVksQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFBO1NBQ3JFO0lBQ1AsQ0FBQyxDQUFBO0lBQ0QsVUFBVSxFQUFFLENBQU8sTUFBcUIsRUFBRSxJQUFpQixFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBVSxFQUFDLEVBQUU7UUFDaEYsSUFBRztZQUNHLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzVDLE9BQU8sSUFBSSxDQUFBO1NBQ2hCO1FBQUEsT0FBTSxLQUFLLEVBQUM7WUFDUCxPQUFPLEtBQUssQ0FBQTtTQUNqQjtJQUNQLENBQUMsQ0FBQTtJQUNELFVBQVUsRUFBQyxDQUFNLE1BQXFCLEVBQUUsSUFBaUIsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQVUsRUFBQyxFQUFFO1FBQzlFLElBQUc7WUFDRyxNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUMzRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDMUI7UUFBQSxPQUFNLEtBQUssRUFBQztZQUNQLE1BQU0sSUFBSSxzQkFBWSxDQUFDLDRCQUE0QixDQUFDLENBQUE7U0FDekQ7SUFDUCxDQUFDLENBQUE7Q0FDTixDQUFBIn0=