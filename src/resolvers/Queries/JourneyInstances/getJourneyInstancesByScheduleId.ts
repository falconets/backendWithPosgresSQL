import { Context, JourneyInstance, journeyInstanceProps } from "@types";
import { GraphQLError } from "graphql";

export const getJourneyInstancesByScheduleId = async(
    parent: JourneyInstance['parent'],
    args: JourneyInstance['args'],
    { models,firestore, user }: Context
):Promise<journeyInstanceProps[]>=>{
    try{
        const journeyInstances = await models.journeyInstances.getJourneyInstancesByScheduleId(firestore, args.scheduleId)
        return journeyInstances

    }catch(err){
        throw new GraphQLError('Failed to retried journey instance')
    }
}