import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    return db.doc(`users/${user.uid}`).set({
      uid: user.uid,
      name: user.displayName,
      avaterURL: user.photoURL,
      activeRoomId: null,
      createdAt: new Date(),
      updateAt: new Date(),
    });
  });

export const addUserCreatedRoomId = functions
  .region('asia-northeast1')
  .firestore.document('rooms/{roomId}')
  .onCreate((snap) => {
    const room = snap.data();
    return db
      .doc(`users/${room.ownerId}/createdRoomIds/${room.roomId}`)
      .set({ createdRoomId: room.roomId });
  });

export const addUserJoinedRoomId = functions
  .region('asia-northeast1')
  .firestore.document('rooms/{roomId}')
  .onCreate((snap) => {
    const room = snap.data();
    return db
      .doc(`users/${room.ownerId}/joinedRoomIds/${room.roomId}`)
      .set({ joinedRoomId: room.roomId });
  });
