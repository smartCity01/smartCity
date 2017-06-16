import { AccountService } from './../util/account.service';
import { SecureStorage } from 'ionic-native';
import { AuthService } from './auth.service';
// Imports
import { Injectable } from '@angular/core';
//import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Http, Response, Headers } from '@angular/http';
import { User } from '../src/Model/user';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
    // Resolve HTTP using the constructor
    constructor(private http: Http, private authService: AuthService, private accountService: AccountService) { }
    // private instance variable to hold base url
    private id_secret_Url = 'http://localhost:1337/api/users/';

    // Fetch all existing IDs and Secrets
    getUsers(): Observable<any> {

        // ..using get Request Options
        return this.http.get(this.id_secret_Url)
            // ...and calling .json() on the response to return data
            .map((res) => res.json())
            //..errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    }

    signIn(username, password) {
        return this.authService.signIn(username, password);
    }

    getUserInfo(userId) {
        let token = this.accountService.secureStorage.get('token');
        let head = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(this.id_secret_Url, { headers: head });
    }

    signUp(username, password, email): Observable<Response> {
        return this.authService.getSignUpToken().concatMap(response => {
            let token = response.access_token;

            let data = {
                "username": username,
                "password": password,
                "email": email
            }
            let body = JSON.stringify(data); //put the data in a string form so it can be easily sent
            let head = new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            });

            return this.doSignUpPost(body, head);
        }).catch(error => {
            console.error(error);
            return Observable.throw(error || 'Server error')
        });
    }

    doSignInPost(body, head) {
        return this.http.post(this.id_secret_Url + 'signIn', body, { headers: head })
            .map((res) => {
                return res;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }


    doSignUpPost(body, head) {
        return this.http.post(this.id_secret_Url, body, { headers: head })
            .map((res) => {
                return res;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}