import { Context, JourneySeat, JourneySeatProps } from "@types";
import { GraphQLError } from "graphql";

export const getJourneySeatsById = async(
    parent: JourneySeat['parent'],
    args: JourneySeat['args'],
    {models, db}:Context
): Promise<JourneySeatProps> =>{
try{
    const res = await db.query(models.journey_seats.getJourneySeatsById(args.seat_id))
    return res.rows[0]

}catch(err){
    throw new GraphQLError('Failed to get seat by id')
}
}