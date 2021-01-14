import { firestore } from 'firebase-admin';
import { User } from './user';

export interface EntryLog {
  userId: string;
  message: string;
  date: firestore.Timestamp;
}

export interface EntryLogWithUser extends EntryLog {
  user: User;
}
