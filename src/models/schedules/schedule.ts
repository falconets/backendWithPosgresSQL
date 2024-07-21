import { BusScheduleProps } from "@types";
import { Timestamp } from "firebase-admin/firestore";
import { v4 as uuidv4 } from "uuid";

enum CollectionName {
  BUS_SCHEDULES = "busSchedules",
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
  date: string | Timestamp
): Promise<BusScheduleProps[]> => {
  try {
    console.log("date:", date);
    const snapshot = await firestore
      .collection(CollectionName.BUS_SCHEDULES)
      .where("date", "==", date)
      .get();
    const data: BusScheduleProps[] = [];

    snapshot.forEach((doc: any) => {
      const docData = doc.data() as BusScheduleProps;
      data.push({ id: doc.id, ...docData });
    });
    return data;
  } catch (err) {
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
  data: BusScheduleProps
): Promise<BusScheduleProps> => {
  try {
    const docId = uuidv4();
    const res = await firestore
      .collection(CollectionName.BUS_SCHEDULES)
      .doc(docId)
      .set(data);
    console.log("Document written with data: ", res);
    return {
      id: docId,
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
