import { BusSeats, BusSeatsProp, Context } from "@types";
import { GraphQLError } from "graphql";

export const getSeatsByBusId = async (
    parent: BusSeatsProp['parent'],
    args: BusSeatsProp['args'],
    {db, models, user}: Context
): Promise<BusSeats[]> =>{
    try{
        const seats = await db.query(models.bus_seats.getSeatsByBusId(args.busId))
        return seats.rows
    }catch(error){
        throw new GraphQLError('Error fetching bus seats')
    }
}