import { GraphQLError } from "graphql"
import { Book, Context, Company } from '../type'

export const Mutation = {
      addBook: async (parent:Book['parent'], args:Book['args'], { db, models }:Context)=>{
            try{
                  const docRef = await db.query(models.Book.addBook(args))
                  return docRef.rows[0]
            }catch(error){
                  throw new GraphQLError("failed to add the book in the database")
            }
      },
      deleteBook: async (parent:Book['parent'], args:Book['args'], { db, models }:Context)=>{
            try{
                  await db.query(models.Book.deleteBook(args))
                  return true
            }catch(error){
                  return false
            }
      },
      updateBook:async(parent:Book['parent'], args:Book['args'], { db, models }:Context)=>{
            try{
                  const update = await db.query(models.Book.updateBook(args))
                  return update.rows[0]
            }catch(error){
                  throw new GraphQLError("Failed to updated the data")
            }
      },
      registerCompany:async(parent:Company['parent'], args:Company['args'], { db, models }:Context)=>{
            try{
                  const register = await db.query(models.company.registerCompany(args))
                  return register.rows[0]
            }catch(err){
                  console.error("here is the error!", err)
                  throw new GraphQLError("Failed to register the company")
            }
      }
}