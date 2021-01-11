import { firestore } from 'firebase-admin';

export interface User {
  uid: string;
  name: string;
  avaterURL: string;
  activeRoomId: string;
  joinedRoomIds: string[];
  createdAt: firestore.Timestamp;
  updateAt: firestore.Timestamp;
}
