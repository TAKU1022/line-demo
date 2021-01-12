import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Room } from '@interfaces/room';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private db: AngularFirestore) {}

  createRoom(
    room: Omit<Room, 'roomId' | 'createdAt' | 'updateAt'>
  ): Promise<void> {
    const roomId: string = this.db.createId();
    return this.db.doc<Room>(`rooms/${roomId}`).set({
      roomId,
      createdAt: firebase.firestore.Timestamp.now(),
      updateAt: firebase.firestore.Timestamp.now(),
      ...room,
    });
  }

  getAllRooms(): Observable<Room[]> {
    return this.db.collection<Room>(`rooms`).valueChanges();
  }

  addRoomJoinedUserId(roomId: string, userId: string): Promise<void> {
    return this.db
      .doc(`rooms/${roomId}/joinedUserIds/${userId}`)
      .set({ joinedUserId: userId });
  }
}
