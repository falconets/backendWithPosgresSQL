import { BusScheduleProps } from "@types";
import { Firestore, Timestamp } from "firebase-admin/firestore";
import { v4 as uuidv4 } from "uuid";

enum CollectionName {
  BUS_SCHEDULES = "schedules",
}

const getBusSchedules = async (
  firestore: FirebaseFirestore.Firestore
): Promise<BusScheduleProps[]> => {
  try {
    const snapshot = await firestore
      .collection(CollectionName.BUS_SCHEDULES)
      .get();
    const data: BusScheduleProps[] = [];

    snapshot.forEach((doc: any) => {
      const docData = doc.data() as BusScheduleProps;
      data.push({ id: doc.id, ...docData });
    });
    return data;
  } catch (err) {
    throw new Error("Failed to get bus schedules");
  }
};

const getBusScheduleByDate = async (
  firestore: FirebaseFirestore.Firestore,
  date: string | Timestamp,
): Promise<BusScheduleProps[]> => {
  try {
    //const targetDateStr = new Date(date as string).toISOString().split('T')[0];

    const snapshot = await firestore
      .collection(CollectionName.BUS_SCHEDULES)
      .where("start", "<=", date)
      .get();
    const data: BusScheduleProps[] = [];

    snapshot.forEach((doc: any) => {
      const docData = doc.data() as BusScheduleProps;
      console.log("founded schedule:",{ id: doc.id, ...docData })
      data.push({ id: doc.id, ...docData });
    });
    return data;
    // const busSchedulesRef = await firestore
    //   .collection(CollectionName.BUS_SCHEDULES)
    //   .where("start", "<=", targetDateStr )
    //   .orderBy("start")
    //   .get();

    // let schedules: BusScheduleProps[] = [];
    // busSchedulesRef.forEach((doc)=>{
    //   const docData = doc.data() as BusScheduleProps;
    //   schedules.push({ id: doc.id,...docData });
    // })

    // let result:BusScheduleProps[] = [];
    // schedules.forEach(schedule => {
    //   if (schedule.recurrenceRule) {
    //     const rule = RRule.fromString(schedule.recurrenceRule);
  
    //     // Expand the recurrence rule to check if it includes the target date
    //     const occurrences = rule.between(
    //       new Date(schedule.start as string),
    //       new Date(schedule.end as string)
    //     );
  
    //     if (occurrences.some(date => date === date)) {
    //       // Check for exceptions
    //       if (!schedule.recurrenceExceptions || !schedule.recurrenceExceptions.includes(targetDateStr)) {
    //         result.push(schedule);
    //       }
    //     }
    //   } else {
    //     // If it's a one-time event, add it directly
    //     result.push(schedule);
    //   }
    // });
  
    // return result;

  } catch (err) {
    console.log('Error getting bus schedules by date:', err);
    throw new Error("Failed to get bus schedules by date");
  }
};

const getBusScheduleByCompanyId = async (
  firestore: FirebaseFirestore.Firestore,
  companyId: number
): Promise<BusScheduleProps[]> => {
  try {
    const snapshot = await firestore
      .collection(CollectionName.BUS_SCHEDULES)
      .where("companyId", "==", companyId)
      .get();
    const data: BusScheduleProps[] = [];

    snapshot.forEach((doc: any) => {
      const docData = doc.data() as BusScheduleProps;
      data.push({ id: doc.id, ...docData });
    });
    return data;
  } catch (err) {
    throw new Error("Failed to get bus schedules by companyId");
  }
};

const getBusScheduleByRouteId = async (
  firestore: FirebaseFirestore.Firestore,
  routeId: string
): Promise<BusScheduleProps[]> => {
  try {
    const snapshot = await firestore
      .collection(CollectionName.BUS_SCHEDULES)
      .where("routeId", "==", routeId)
      .get();
    const data: BusScheduleProps[] = [];

    snapshot.forEach((doc: any) => {
      const docData = doc.data() as BusScheduleProps;
      data.push({ id: doc.id, ...docData });
    });
    return data;
  } catch (err) {
    throw new Error("Failed to get bus schedules by routeId");
  }
};

const addBusSchedule = async (
  firestore: FirebaseFirestore.Firestore,
  transaction: FirebaseFirestore.Transaction,
  data: BusScheduleProps
): Promise<BusScheduleProps> => {
  try {
    const docId = uuidv4();
    const ref = await firestore
      .collection(CollectionName.BUS_SCHEDULES)
      .doc(docId)

      await transaction.set(ref, data)

    return {
      id: ref.id,
      ...data,
    };
  } catch (err) {
    throw new Error("Failed to add bus schedule");
  }
};

const deleteBusSchedule = async (
  firestore: FirebaseFirestore.Firestore,
  docId: string
): Promise<boolean> => {
  try {
    const docRef = firestore
      .collection(CollectionName.BUS_SCHEDULES)
      .doc(docId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return false;
    }

    await docRef.delete();
    return true;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete bus schedule");
  }
};

const updateBusSchedule = async (
  firestore: FirebaseFirestore.Firestore,
  docId: string,
  data: Partial<BusScheduleProps>
): Promise<Partial<BusScheduleProps>> => {
  try {
    const docRef = await firestore
      .collection(CollectionName.BUS_SCHEDULES)
      .doc(docId);

    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error("Document does not exist.");
    }

    await docRef.update(data);
    return {
      id: docId,
      ...data,
    };
  } catch (err) {
    throw new Error("Failed to update bus schedule");
  }
};

export default {
  getBusSchedules,
  getBusScheduleByDate,
  getBusScheduleByCompanyId,
  getBusScheduleByRouteId,
  addBusSchedule,
  updateBusSchedule,
  deleteBusSchedule,
};
