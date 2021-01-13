import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Room } from '@interfaces/room';
import firebase from 'firebase/app';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  getRoomById(roomId: string): Observable<Room> {
    return this.db.doc<Room>(`rooms/${roomId}`).valueChanges();
  }

  getCreatedRooms(userId: string): Observable<Room[]> {
    return this.db
      .collection(`users/${userId}/createdRoomIds`)
      .valueChanges()
      .pipe(
        switchMap((createdRoomIds: { createdRoomId: string }[]) => {
          const rooms$$: Observable<Room>[] = createdRoomIds.map(
            (doc: { createdRoomId: string }) =>
              this.getRoomById(doc.createdRoomId)
          );
          return combineLatest(rooms$$);
        })
      );
  }

  getJoinedRooms(userId: string): Observable<Room[]> {
    return this.db
      .collection(`users/${userId}/joinedRoomIds`)
      .valueChanges()
      .pipe(
        switchMap((joinedRoomIds: { joinedRoomId: string }[]) => {
          const rooms$$: Observable<Room>[] = joinedRoomIds.map(
            (doc: { joinedRoomId: string }) =>
              this.getRoomById(doc.joinedRoomId)
          );
          return combineLatest(rooms$$);
        })
      );
  }
}
