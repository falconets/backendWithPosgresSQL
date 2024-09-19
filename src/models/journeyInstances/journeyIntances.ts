import { journeyInstanceProps } from "@types";
import { v4 as uuidv4 } from "uuid";
import { CollectionName } from "../../tables";

/**
 * The function create a new instance that indicate the journey
 * of the bus on a specific date based on the schedule
 * @param firestore connect to firestore
 * @param transaction set data in the database based on the transaction
 * @param data data to be sent to the firestore of type JourneyInstanceProps
 * @returns data of type journeyInstanceProps
 */
const addJourneyInstance = async (
  firestore: FirebaseFirestore.Firestore,
  transaction: FirebaseFirestore.Transaction,
  data: journeyInstanceProps
): Promise<journeyInstanceProps> => {
  try {
    const docId = uuidv4();
    const ref = await firestore
      .collection(CollectionName.JOURNEY_INSTANCES)
      .doc(docId);

    await transaction.set(ref, data);

    return {
      id: ref.id,
      ...data,
    };
  } catch (err) {
    throw new Error("Failed to add journey instance");
  }
};

/**
 * this queries the collection for journey instances
 * by scheduleId
 * @param firestore connection to database
 * @param scheduleId parameter of the query
 * @returns array of journey instances
 */
const getJourneyInstancesByScheduleId = async (
  firestore: FirebaseFirestore.Firestore,
  scheduleId: string
): Promise<journeyInstanceProps[]> => {
  try {
    const snapshot = await firestore
      .collection(CollectionName.JOURNEY_INSTANCES)
      .where('scheduleId', "==", scheduleId)
      .get();
    const data: journeyInstanceProps[] = [];
    snapshot.forEach((doc: any) => {
      const docData = doc.data() as journeyInstanceProps;
      data.push({ id: doc.id, ...docData });
    });
    return data;
  } catch (err) {
    throw new Error("Failed to get journey instances by schedule id");
  }
};

const getJourneyInstancesByDate = async (
  firestore: FirebaseFirestore.Firestore,
  date: string
): Promise<journeyInstanceProps[]> => {
  try {
    const snapshot = await firestore
      .collection(CollectionName.JOURNEY_INSTANCES)
      .where("journeyDate", ">=", date)
      .get();

    const data: journeyInstanceProps[] = [];
    snapshot.forEach((doc: any) => {
      const docData = doc.data() as journeyInstanceProps;
      data.push({ id: doc.id, ...docData });
    });
    return data;
  } catch (err) {
    throw new Error("Failed to get journey instances by date");
  }
};

/**
 * this queries the collection for journey instances
 * by id
 * @param firestore connection to database
 * @param id the id of the journey instance
 */
const getJourneyInstancesById = async (
  firestore: FirebaseFirestore.Firestore,
  id: string
): Promise<journeyInstanceProps> => {
  try {
    const doc = await firestore
      .collection(CollectionName.JOURNEY_INSTANCES)
      .doc(id)
      .get();
    if (!doc.exists) {
      throw new Error("Journey instance not found");
    }
    const data = doc.data() as journeyInstanceProps;
    return { id: doc.id, ...data };
  } catch (err) {
    console.log(err)
    throw new Error("Failed to get journey instance by id");
  }
};

const getJourneyInstancesByBusId = async (
  firestore: FirebaseFirestore.Firestore,
  busId: string
):Promise<journeyInstanceProps[]> => {
  try {
    const snapshot = await firestore
      .collection(CollectionName.JOURNEY_INSTANCES)
      .where("busId", "==", busId)
      .get();

    const data: journeyInstanceProps[] = [];
    snapshot.forEach((doc: any) => {
      const docData = doc.data() as journeyInstanceProps;
      data.push({ id: doc.id, ...docData });
    });
    return data;
  } catch (err) {
    throw new Error("Failed to get journey instances by bus id");
  }
};
const getJourneyInstancesByRouteId = async (
  firestore: FirebaseFirestore.Firestore,
  routeId: string
):Promise<journeyInstanceProps[]> => {
  try {
    const snapshot = await firestore
      .collection(CollectionName.JOURNEY_INSTANCES)
      .where("routeId", "==", routeId)
      .get();

    const data: journeyInstanceProps[] = [];
    snapshot.forEach((doc: any) => {
      const docData = doc.data() as journeyInstanceProps;
      data.push({ id: doc.id, ...docData });
    });
    return data;
  } catch (err) {
    throw new Error("Failed to get journey instances by route id");
  }
};

export default {
  addJourneyInstance,
  getJourneyInstancesByScheduleId,
  getJourneyInstancesByDate,
  getJourneyInstancesById,
  getJourneyInstancesByBusId,
  getJourneyInstancesByRouteId,
};
