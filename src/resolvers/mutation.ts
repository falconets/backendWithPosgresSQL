import { GraphQLError } from "graphql"
import { Book, Context, Company, User } from '../type'
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRETE= "busticketpro$piloting$project"

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
                  throw new GraphQLError("Failed to register the company")
            }
      },
      registerUser:async(parent:User['parent'], args:User['args'], { db, models }:Context)=>{
            try{
                  const checkUser = await db.query(models.users.checkUser(args))
                  if(checkUser?.rows[0].count == 0){
                        const register = await db.query(await models.users.registerUser(args))
                        console.log(register)

                        const payload = {
                              userId: register.rows[0].id,
                              //add expiration sessionlater
                        }

                        return `${jwt.sign(payload, JWT_SECRETE)} ${register.rows[0].id}`

                  }else{
                        return "email aleady exist exist"
                  }
            }catch(err){
                  console.log("user registration error", err)
                  throw new GraphQLError("Failed to register the user")
            }
      }
}