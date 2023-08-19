import { GraphQLError } from "graphql";
export const Mutation = {
    addBook: async (parent, args, { db, models }) => {
        try {
            const docRef = await db.query(models.Book.addBook(args));
            return docRef.rows[0];
        }
        catch (error) {
            throw new GraphQLError("failed to add the book in the database");
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
            throw new GraphQLError("Failed to updated the data");
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0YXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmVzb2x2ZXJzL211dGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFHdEMsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHO0lBQ2xCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBcUIsRUFBRSxJQUFpQixFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBVSxFQUFDLEVBQUU7UUFDN0UsSUFBRztZQUNHLE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ3hELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUMxQjtRQUFBLE9BQU0sS0FBSyxFQUFDO1lBQ1AsTUFBTSxJQUFJLFlBQVksQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFBO1NBQ3JFO0lBQ1AsQ0FBQztJQUNELFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBcUIsRUFBRSxJQUFpQixFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBVSxFQUFDLEVBQUU7UUFDaEYsSUFBRztZQUNHLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzVDLE9BQU8sSUFBSSxDQUFBO1NBQ2hCO1FBQUEsT0FBTSxLQUFLLEVBQUM7WUFDUCxPQUFPLEtBQUssQ0FBQTtTQUNqQjtJQUNQLENBQUM7SUFDRCxVQUFVLEVBQUMsS0FBSyxFQUFDLE1BQXFCLEVBQUUsSUFBaUIsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQVUsRUFBQyxFQUFFO1FBQzlFLElBQUc7WUFDRyxNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUMzRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDMUI7UUFBQSxPQUFNLEtBQUssRUFBQztZQUNQLE1BQU0sSUFBSSxZQUFZLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtTQUN6RDtJQUNQLENBQUM7Q0FDTixDQUFBIn0=