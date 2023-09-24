import { GraphQLError } from 'graphql';
import { Context, Company } from '../../type'

const companyQuery = {
      allCompanies: async (parent:Company['parent'], args:Company['args'], { db, models}:Context)=>{
            try{
              const companies = await db.query(models.company.allCompanies())
              return companies.rows.slice(0,99)
            }catch(err){
              throw new GraphQLError("Failed to return the Companies...")
            }
          }
}

export default companyQuery
