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


export type Context = {
  db: Pool
  models: typeof models
};

