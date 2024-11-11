import { Pool } from "pg";
import models from "./models";
import mtn from "config/mtn";
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

type userTokenType = {
  userId: string 
  exp: string
  iat: string
}

export type Context = {
  db: Pool;
  models: typeof models;
  user: userTokenType | null
  firestore: FirebaseFirestore.Firestore;
  mtn: typeof mtn;
  res: any
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

export interface BusRoutesProps {
  id?: string;
  companyId: number;
  routeName: string;
  distanceInKm: number;
  durationInHours: number;
  startLocation: string;
  endLocation: string;
  active: boolean;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export type BusRoutes = {
  parent: any;
  args: BusRoutesProps;
};

export interface BusStopProps {
  id?: string;
  companyid: number;
  stopName: string;
  latitude: string;
  longitude: string;
  routeId?: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  route?: BusRoutesStopProps;
}

export type BusStops = {
  parent: any;
  args: BusStopProps;
};

export interface BusRoutesStopProps {
  routeId: string;
  stopId?: string;
  id?: string;
  stopOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type BusRoutesStops = {
  parent: any;
  args: BusRoutesStopProps;
};


export type BusScheduleProps = {
  id?: string;
  companyId: number;
  busPlateNumber: string;
  start: admin.firestore.Timestamp | string; 
  end: admin.firestore.Timestamp | string; 
  routeId: string;
  tickets: number;
  description: string;
  background: string;
  borderColor: string;
  recurrenceRule: string;
  recurrenceExceptions: string | string[];
};

export type BusSchedule = {
  parent: any;
  args: BusScheduleProps;
};

export type TicketProps = {
  companyId: string;
  ticketId: string;
  passengerName: string;
  phone?: string;
  seatNumber: string;
  numberOfTickets: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
  routeId: BusRoutesProps;
  bookingReference: string;
  passengerEmail: string;
  paymentMethod: string;
  financialTransactionId: string;
  externalId: string;
  currency: string;
  partyIdType: string;
  partyId: string;
  payerMessage: string;
  payeeNote: string;
  status: string;
  created_by?: string;
  updated_by?: string;
};

export type Tickets = {
  parent: any;
  args: TicketProps;
};

export interface requestToPayArgs {
  amount: string;
  currency: string;
  externalId: string;
  payer: {
    partyIdType: string;
    partyId: string;
  };
  payerMessage: string;
  payeeNote: string;
}

export enum statusEnum{
  SUCCESS="SUCCESSFUL",
  PENDING="PENDING",
  FAILED="FAILED",
  
}

export interface requestToPayResponse {
  amount: string;
  currency: string;
  financialTransactionId: string;
  payer: {
    partyId: string;
    partyIdType: string;
  };
  payeeNote: string;
  payerMessage: string;
  status: statusEnum;
  reason?:{
    code: string;
    message: string;
  }
}

export interface transferArgs {
  amount: string;
  currency: string;
  externalId: string;
  payee: {
    partyIdType: string;
    partyId: string;
  };
  payerMessage: string;
  payeeNote: string;
}

export interface BusSeats{
  seat_id: string;
  busId: string;
  seatNumber: string;
  seatType: string;
  is_available: boolean;
  createdAt?: string;
  updatedAt?: string;
  row: number;
  col: number;
  aisleColumn: number;
}

export type BusSeatsProp = {
  parent: any;
  args: BusSeats;
}

export interface JourneySeatProps {
  id?: string
  schedule_id: string
  seat_id: string
  is_booked: boolean
  booking_id?: string
  created_at?: string | null
  updated_at?: string | null
}

export type JourneySeat = {
  parent: any;
  args: JourneySeatProps;
}

export type journeyInstanceProps = {
  id?: string
  scheduleId: string
  journeyDate: string | admin.firestore.Timestamp
  startTime: string | admin.firestore.Timestamp
  endTime: string | admin.firestore.Timestamp
  busId: string
  routeId: string
  createdAt: string
  companyId: string
}

export type JourneyInstance = {
  parent: any;
  args: journeyInstanceProps;
}

export type companyRevenueReport={
  booking_date: number |string
  total_revenue: number
  total_bookings: number
}

export type companyRevenueReportProps={
  companyId: number
  date: string
}

export type companyRevenueReportType = {
  parent: any;
  args: companyRevenueReportProps;
}

export type seatAllocationStatsProps = {
  bus_plate_number?: string
  routeId?: string
  total_seats: number
  total_available_seats: number
  total_booked_seats: number
}

export interface seatAllocationStats{
  date?:string
  companyId?:number
  busId: number
  journeyInstanceId: string
}

export type seatAllocationStatsType = {
  parent: any;
  args: seatAllocationStats;
}

export type companyRevenueByPaymnentMethodProp = {
  paymentMethod: string
  total_revenue: number
  number_of_tickets: number
}

export interface companyRevenueByPaymnentMethod{
  companyId: number
  date?: string
}

export type companyRevenueByPaymnentMethodType = {
  parent: any;
  args: companyRevenueByPaymnentMethod;
}