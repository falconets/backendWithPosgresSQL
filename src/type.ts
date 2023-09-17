import { Pool } from "pg";
import models from "./models";

export interface BookProps {
  title?: string
  author?: string
  store?: string
  id?: string
}

export type Book = {
  parent: any
  args: BookProps
};

export interface CompanyProps{
    companyid?: string,
    company_name?: string,
    phone_number?: string,
    email?: string,
    physical_address?: string,
    province?: string,
    created_at?: string,
    updated_at?: string,
    bank_details?: string
  }

export type Company = {
  parent: any,
  args: CompanyProps
}

export interface UserProps{
    id?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    type: string,
    gender: string,
    password: string,
    created_at?: string,
    updated_at?: string,
    bus_company_id?: number
}

export type User ={
  parent:any;
  args:UserProps;
}

export type Context = {
  db: Pool
  models: typeof models
  user: any
};

export interface tokenProp{
  token :string | null ,
}
