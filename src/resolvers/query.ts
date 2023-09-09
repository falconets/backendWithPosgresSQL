import { GraphQLError } from 'graphql';
import { Book, Context, Company } from '../type'


export const Query = {
  books: async (parent:Book['parent'], args:Book['args'], { db, models}:Context) => {
    const result = await db.query(models.Book.allBooks());
    return result.rows.slice(0, 99);
  },
  oneBook: async (parent:Book['parent'], args:Book['args'], { db, models}:Context)=>{
    try{
      const result = await db.query(models.Book.findBook(args))
      return result.rows[0]
    }catch(error){
      throw new GraphQLError("The book not found!")
    }
  },
  allCompanies: async (parent:Company['parent'], args:Company['args'], { db, models}:Context)=>{
    try{
      const companies = await db.query(models.company.allCompanies())
      return companies.rows.slice(0,99)
    }catch(err){
      throw new GraphQLError("Failed to return the Companies...")
    }
  }
};

