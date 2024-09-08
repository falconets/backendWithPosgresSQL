import { bookMutations } from "./bookMutations";
import { companyMutations } from "./companyMutations";
import { userMutations } from "./userMutations";
import { busesMutation } from "./busesMutation"
import RouteMutation from "./RouteMutation";
import BusScheduleMutation from "./BusScheduleMutation";
import ticketMutations from "./BusTickets";
import BusSeats from "./BusSeats";

export const Mutation = {
  ...bookMutations,
  ...companyMutations,
  ...userMutations,
  ...busesMutation,
  ...RouteMutation,
  ...BusScheduleMutation,
  ...ticketMutations,
  ...BusSeats,
};
