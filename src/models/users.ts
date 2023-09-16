import bcrypt from "bcrypt";
import { UserProps } from "../type";

const registerUser = async(s:UserProps)=>{
      const hashed = await bcrypt.hash(s.password, 10)

      return `INSERT INTO users (first_name, last_name, email, type, gender, password, bus_company_id) 
            VALUES ('${s.first_name}', '${s.last_name}', '${s.email}','${s.type}', '${s.gender}', '${hashed}',
            '${s.bus_company_id}') RETURNING *;   `
}

const checkUser = (s:UserProps)=>{
      return `SELECT COUNT(*) FROM users where email='${s.email}'`
}

export default{
      registerUser,
      checkUser,
}