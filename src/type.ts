import { Pool } from "pg";
import models from "./models";
import admin from "firebase-admin";

export interface BookProps {
  title?: string;
  author?: string;
  store?: string;
  id?: string;
}

export type Book = {
  parent: any;
  args: BookProps;
};

export interface CompanyProps {
  companyid?: string;
  company_name?: string;
  phone_number?: string;
  email?: string;
  physical_address?: string;
  province?: string;
  created_at?: string;
  updated_at?: string;
  bank_details?: string;
  logo?: string;
}

export type Company = {
  parent: any;
  args: CompanyProps;
};

export interface UserProps {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  type: string;
  gender: string;
  password: string;
  created_at?: string;
  updated_at?: string;
  bus_company_id?: number;
  avatar?: string;
  is_email_verified?: boolean;
}

export type User = {
  parent: any;
  args: UserProps;
};

export type Context = {
  db: Pool;
  models: typeof models;
  user: any;
  firestore: FirebaseFirestore.Firestore;
};

export interface tokenProp {
  token: string | null;
}

export interface busesProp {
  bus_id?: string;
  bus_model?: string;
  plate_number?: string;
  seat_capacity?: number;
  bus_company?: number;
}

export type Buses = {
  parent: any;
  args: busesProp;
};

export interface TicketsProps {
  saleId: string;
  customerId: string;
  busId: string;
  routeId: string;
  saleAmount: string;
  saleDateTime: string;
}

export type Tickets = {
  parent: any;
  args: TicketsProps;
};

export interface PaymentsProps {
  id: string;
  saleId: string;
  paymentAmount: string;
  dateTime: string;
  paymentMethod: string;
  bus_company?: string;
  status: string;
}

export type Payments = {
  parent: any;
  args: PaymentsProps;
};

export interface BusRoutesProps{
  id?: string;
  companyId: number
  routeName: string
  distanceInKm: number
  durationInHours: number
  startLocation: string
  endLocation: string
  active: boolean
  price: number
  createdAt?: string
  updatedAt?: string
}

export type BusRoutes = {
  parent:any,
  args: BusRoutesProps
}

export interface BusStopProps{
 id?: string,
 companyid: number,
 stopName: string,
 latitude: string,
 longitude: string,
 routeId?: string,
 description: string,
 createdAt?: string
 updatedAt?: string
 route?:BusRoutesStopProps,
}

export type BusStops = {
  parent:any,
  args: BusStopProps
}

export interface BusRoutesStopProps{
  routeId:string,
  stopId?:string,
  id?: string,
  stopOrder?: number
  createdAt?: string
  updatedAt?: string
}

export type BusRoutesStops = {
  parent:any,
  args: BusRoutesStopProps
}

export type BusScheduleProps = {
  id?: string;
  company_id: number;
  bus_id: number;
  date: admin.firestore.Timestamp | string; // Date string in YYYY-MM-DD format
  time: string; // Time string in HH:MM format
  route_id: string;
  tickets: number;
};

export type BusSchedule = {
  parent: any;
  args: BusScheduleProps;
}
