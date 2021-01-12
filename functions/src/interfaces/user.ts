import { firestore } from 'firebase-admin';

export interface User {
  uid: string;
  name: string;
  avaterURL: string;
  activeRoomId: string;
  createdAt: firestore.Timestamp;
  updateAt: firestore.Timestamp;
}
