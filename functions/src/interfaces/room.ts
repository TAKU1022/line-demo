import { firestore } from 'firebase-admin';

export interface Room {
  roomId: string;
  ownerId: string;
  name: string;
  description: string;
  iconURL: string;
  createdAt: firestore.Timestamp;
  updateAt: firestore.Timestamp;
}
