import {Injectable} from '@angular/core';
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public auth: any;
  public app: any;

  constructor() {
    const config = environment.firebase;
    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
  }


}
