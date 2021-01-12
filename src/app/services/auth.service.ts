import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@interfaces/user';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  afUser: Observable<firebase.User> = this.afAuth.user;
  user$: Observable<User> = this.afUser.pipe(
    switchMap((user: firebase.User) => {
      if (user) {
        return this.db.doc(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })
  );
  userId: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.afUser.subscribe((user: firebase.User) => {
      console.log(user?.uid);
      this.userId = user?.uid;
    });
  }

  loginWithGoole(): Promise<void> {
    const gooleAuthProvider = new firebase.auth.GoogleAuthProvider();
    gooleAuthProvider.setCustomParameters({ prompt: 'select_account' });
    return this.afAuth
      .signInWithPopup(gooleAuthProvider)
      .then(() => {
        this.router.navigateByUrl('');
        this.snackBar.open('ログイン成功', null);
      })
      .catch(() => {
        this.snackBar.open('ログイン失敗', null);
      });
  }

  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('welcome');
      this.snackBar.open('ログアウト成功', null);
    });
  }
}
