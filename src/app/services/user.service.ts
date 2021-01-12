import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  addUserJoinedRoomId(userId: string, roomId: string): Promise<void> {
    return this.db
      .doc(`users/${userId}/joinedRoomIds/${roomId}`)
      .set({ joinedRoomId: roomId });
  }

  updateUserActiveRoomId(userId: string, roomId: string): Promise<void> {
    return this.db
      .doc<User>(`users/${userId}`)
      .update({ activeRoomId: roomId });
  }
}
