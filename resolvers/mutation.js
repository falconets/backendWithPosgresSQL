import { GraphQLError } from "graphql"

export const Mutation = {
      addBook: async (parent, args, {db, models})=>{
            try{
                  const docRef = await db.query(models.Book.addBook(args.author, args.title, args.store))
                  return docRef.rows[0]
            }catch(error){
                  throw new GraphQLError("failed to add the book in the database")
            }
      },
      deleteBook: async (parent, args,{db, models})=>{
            try{
                  await db.query(models.Book.deleteBook(args.id))
                  return true
            }catch(error){
                  return false
            }
      },
      updateBook:async(parent, args, {db, models})=>{
            try{
                  const update = await db.query(models.Book.updateBook(args.id,args.store))
                  return update.rows[0]
            }catch(error){
                  throw new GraphQLError("Failed to updated the data")
            }
      }
}