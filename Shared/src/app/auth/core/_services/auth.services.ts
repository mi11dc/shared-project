import { Injectable, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {

    userData: any;

    constructor(
        private ngFireAuth: AngularFireAuth
    ) {
        this.userData = ngFireAuth.authState;
    }

    /* Sign up */
    SignUp(email: string, password: string) {
        return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
    }
    
    /* Sign in */
    SignIn(email: string, password: string) {
        return this.ngFireAuth.signInWithEmailAndPassword(email, password);
    }

}