import bcrypt from "bcrypt";
import { UserProps } from "../type";

const registerUser = async(s:UserProps)=>{
      const hashed = await bcrypt.hash(s.password, 10)

      return `INSERT INTO users (first_name, last_name, email, phone_number, type, gender, password, bus_company_id, is_email_verified) 
            VALUES ('${s.first_name}', '${s.last_name}', '${s.email}','${s.phone_number}','${s.type}', '${s.gender}', '${hashed}',
            '${s.bus_company_id}', 'false') RETURNING *;   `
}

const checkUser = (s:UserProps)=>{
      return `SELECT * FROM users WHERE email='${s.email}' LIMIT 1;`
}

const allUsers = ()=>{
      return "SELECT * FROM users;"
}

const companyUsers = (s:UserProps)=>{
      return `SELECT * FROM users WHERE bus_company_id='${s.bus_company_id}';`
}

const removeUser = (s:UserProps)=>{
      return `DELETE FROM users where id=${s.id};`; 
}


export default{
      registerUser,
      checkUser,
      allUsers,
      companyUsers,
      removeUser
}