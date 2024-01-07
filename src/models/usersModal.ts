import bcrypt from "bcrypt";
import { UserProps } from "@types";

const registerUser = async(s:UserProps)=>{
      const hashed = await bcrypt.hash(s.password, 10)
      const avatar = s.avatar? s.avatar : 'N/A'
      console.log('avatar', avatar)

      return `INSERT INTO users (first_name, last_name, email, phone_number, type, gender, password, bus_company_id, avatar, is_email_verified) 
            VALUES ('${s.first_name}', '${s.last_name}', '${s.email}','${s.phone_number}','${s.type}', '${s.gender}', '${hashed}',
            '${s.bus_company_id}', '${avatar}', ${s.is_email_verified}) RETURNING *;   `
}

const checkUser = (s:UserProps):string=>{
      return `SELECT * FROM users WHERE email='${s.email}' LIMIT 1;`
}

const userById = (s:UserProps):string=>{  
      return `SELECT * FROM users WHERE id=${s.id};`
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

const updateUser = (s:UserProps)=>{
      return `UPDATE users SET email='${s.email}'
      ,type='${s.type}', first_name='${s.first_name}',
      last_name='${s.last_name}', phone_number='${s.phone_number}',
      avatar='${s.avatar}', is_email_verified=${s.is_email_verified} WHERE id=${s.id}
      `
}


export default{
      registerUser,
      checkUser,
      allUsers,
      companyUsers,
      removeUser,
      userById,
      updateUser
}