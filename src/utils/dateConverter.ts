import { Timestamp } from 'firebase-admin/firestore';

/**
 * Converts a date string into a Firestore Timestamp.
 * @param dateString - The date string to convert. Should be in a format that can be parsed by Date constructor (e.g., 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @returns A Firestore Timestamp object.
 */
export function convertDateStringToTimestamp(dateString: string): Timestamp {
  const date = new Date(dateString);
  return Timestamp.fromDate(date);
}


