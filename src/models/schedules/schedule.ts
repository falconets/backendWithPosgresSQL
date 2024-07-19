import { BusScheduleProps } from "@types";

const getBusSchedules = async(firestore:any, collectionName:string):Promise<BusScheduleProps[]> =>{
    try{
        const snapshot = await firestore.collection(collectionName).get();
        const data: BusScheduleProps[] = []

        // snapshot.forEach((doc) => {
        //     data[doc.id] = doc.data() as BusScheduleProps;
        // })
        console.log('All data', snapshot)
        return data
    }catch(err){
        console.log('Error getting documents', err);
        throw new Error('Failed to get bus schedules')
    }
}

export default {
    getBusSchedules
}