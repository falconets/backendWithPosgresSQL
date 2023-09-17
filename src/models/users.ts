import bcrypt from "bcrypt";
import { UserProps } from "../type";

const registerUser = async(s:UserProps)=>{
      const hashed = await bcrypt.hash(s.password, 10)

      return `INSERT INTO users (first_name, last_name, email, type, gender, password, bus_company_id, is_email_verified) 
            VALUES ('${s.first_name}', '${s.last_name}', '${s.email}','${s.type}', '${s.gender}', '${hashed}',
            '${s.bus_company_id}', 'false') RETURNING *;   `
}

const checkUser = (s:UserProps)=>{
      return `SELECT * FROM users WHERE email='${s.email}' LIMIT 1;`
}



export default{
      registerUser,
      checkUser,
}