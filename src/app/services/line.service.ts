import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EntryLog, EntryLogWithUser } from '@interfaces/entryLog';
import { User } from '@interfaces/user';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LineService {
  constructor(private db: AngularFirestore) {}

  addEntryLog(roomId: string, message: string, userId: string): Promise<void> {
    const entryLogId = this.db.createId();
    return this.db
      .doc(`rooms/${roomId}/entryLogs/${entryLogId}`)
      .set({ message, userId, date: new Date() });
  }

  getRoomEntryLogs(roomId: string): Observable<EntryLogWithUser[]> {
    return this.db
      .collection<EntryLog>(`rooms/${roomId}/entryLogs`, (ref) => {
        return ref.orderBy('date', 'desc');
      })
      .valueChanges()
      .pipe(
        switchMap((entryLogs: EntryLog[]) => {
          const distinctUserIds: string[] = Array.from(
            new Set(entryLogs.map((entryLog: EntryLog) => entryLog.userId))
          );
          const user$$: Observable<User>[] = distinctUserIds.map(
            (userId: string) => {
              return this.db.doc<User>(`users/${userId}`).valueChanges();
            }
          );
          const user$: Observable<User[]> = combineLatest(user$$);
          return combineLatest([of(entryLogs), user$]);
        }),
        map(([entryLosgs, users]) => {
          return entryLosgs.map((entryLog: EntryLog) => {
            return {
              ...entryLog,
              user: users.find((user: User) => user.uid === entryLog.userId),
            };
          });
        })
      );
  }
}
