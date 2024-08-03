import { TicketProps } from "@types";
import { tracks } from "../../tables";
import { v4 as uuidv4 } from "uuid";

const table = tracks.TICKETS;

const getTickets = () => {
  return `SELECT * FROM public.tickets;`;
};

const getTicketsByCompanyId = (arg: TicketProps) => {
  return `SELECT * FROM ${table} WHERE "companyId"=${arg.companyId};`;
};

const addTicket = (arg: TicketProps) => {
  const uuid = uuidv4();

  return {
    text: `INSERT INTO public.tickets (
            "ticketId", "companyId", "passengerName", "seatNumber", amount, "routeId",
            "passengerEmail", "paymentMethod", "financialTransactionId", "externalId", currency, "partyIdType",
            "partyId", "payerMessage", "payeeNote", status, created_by, updated_by, "numberOfTickets"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
        RETURNING *;`,
    values: [
      uuid,
      arg.companyId,
      arg.passengerName,
      arg.seatNumber,
      arg.amount,
      arg.routeId,
      arg.passengerEmail,
      arg.paymentMethod,
      arg.financialTransactionId,
      arg.externalId,
      arg.currency,
      arg.partyIdType,
      arg.partyId,
      arg.payerMessage,
      arg.payeeNote,
      arg.status,
      arg.created_by,
      arg.updated_by,
      arg.numberOfTickets,
    ],
  };
};

export default {
  getTickets,
  getTicketsByCompanyId,
  addTicket,
};
