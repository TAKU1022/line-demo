import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const addRoomJoinedUserId = functions
  .region('asia-northeast1')
  .firestore.document('rooms/{roomId}')
  .onCreate((snap) => {
    const room = snap.data();
    return db
      .doc(`rooms/${room.roomId}/joinedUserId/${room.ownerId}`)
      .set({ joinedUserId: room.ownerId });
  });
