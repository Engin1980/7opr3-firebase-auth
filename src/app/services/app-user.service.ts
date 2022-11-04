import {Injectable} from '@angular/core';
import {Observable, from, tap} from "rxjs";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {FirebaseService} from "./firebase.service";
import {NotificationService} from "./notification.service";


@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  currentUser: any = null;

  constructor(private firebaseService: FirebaseService,
              private notificationService: NotificationService) {
  }

  getCurrentUser() {
    return this.currentUser;
  }

  register(username: string, password: string): Observable<any> {
    const auth = this.firebaseService.auth;
    const ret$ = from(createUserWithEmailAndPassword(auth, username, password));
    return ret$.pipe(
      tap({
        next: q => {
          this.notificationService.showInfo("User " + username + " registered.");
          this.currentUser = q
        },
        error: q => this.notificationService.showError("Failed to register user " + username + ". Reason: " + q.code + " :: " + q.message)
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    const auth = this.firebaseService.auth;
    const ret$ = from(signInWithEmailAndPassword(auth, username, password));
    return ret$.pipe(
      tap({
        next: q => {
          console.log(JSON.stringify(q));
          this.notificationService.showInfo("User " + username + " logged in.");
          this.currentUser = q;
        },
        error: q => this.notificationService.showError("Failed to login user " + username + ". Reason: " + q.code + " :: " + q.message)
      })
    );
  }

  logout(): Observable<any> {
    const auth = this.firebaseService.auth;
    const ret$ = from(signOut(auth));
    return ret$.pipe(
      tap({
        next: q => this.notificationService.showInfo("User logged in."),
        error: q => this.notificationService.showError("Failed to logout user. Reason: " + q.code + " :: " + q.message)
      })
    );
  }
}
