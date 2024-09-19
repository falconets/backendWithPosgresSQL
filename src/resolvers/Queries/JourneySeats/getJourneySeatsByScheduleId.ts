import { Context, JourneySeat, JourneySeatProps } from "@types";
import { GraphQLError } from "graphql";

export const getJourneySeatsByScheduleId =  async(
    parent: JourneySeat['parent'],
    args: JourneySeat['args'],
    { db, models, user}: Context
):Promise<JourneySeatProps[] | null> =>{
    try{
        const res = await db.query(models.journey_seats.getJourneySeatsByScheduleId(args.schedule_id))
        return res.rows;  

    }catch(err){
        console.log('catched error: ',err)
        throw new GraphQLError('Failed to get journey seats by schedule id')
    }
}