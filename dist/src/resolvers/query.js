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
exports.Query = void 0;
const graphql_1 = require("graphql");
exports.Query = {
    books: (parent, args, { db, models }) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.query(models.Book.allBooks());
        return result.rows.slice(0, 99);
    }),
    oneBook: (parent, args, { db, models }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield db.query(models.Book.findBook(args));
            return result.rows[0];
        }
        catch (error) {
            throw new graphql_1.GraphQLError("The book not found!");
        }
    })
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmVzb2x2ZXJzL3F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUkxQixRQUFBLEtBQUssR0FBRztJQUNuQixLQUFLLEVBQUUsQ0FBTyxNQUFxQixFQUFFLElBQWlCLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFTLEVBQUUsRUFBRTtRQUMvRSxNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQTtJQUNELE9BQU8sRUFBRSxDQUFPLE1BQXFCLEVBQUUsSUFBaUIsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQVMsRUFBQyxFQUFFO1FBQ2hGLElBQUc7WUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUN6RCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDdEI7UUFBQSxPQUFNLEtBQUssRUFBQztZQUNYLE1BQU0sSUFBSSxzQkFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUE7U0FDOUM7SUFDSCxDQUFDLENBQUE7Q0FDRixDQUFDIn0=