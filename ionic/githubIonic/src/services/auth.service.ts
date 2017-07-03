// Imports
import { Injectable } from '@angular/core';
//import {Http, Response, Headers, RequestOptions} from '@angular/http';

import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UrlProvider } from "../util/url-provider";

@Injectable()
export class AuthService {
  // Resolve HTTP using the constructor
  constructor(private http: Http) { }
  // private instance variable to hold base url
  private id_secret_Url = UrlProvider.url + '/api/oauth/token';

  // Fetch all existing IDs and Secrets
  getSignUpToken(): Observable<any> {
    let data = {
      "grant_type": "client_credentials",
      "client_id": "android",
      "client_secret": "myClientSecret"
    }
    let body = JSON.stringify(data);
    let head = new Headers({
      'Content-Type': 'application/json'
    });

    // ..using get Request Options- make post rqst
    return this.http.post(this.id_secret_Url, body, { headers: head })
      // ...and calling .json() on the response to return data
      .map((res) => res.json())
      //..errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }

  signIn(username, password) {
    let data = {
      "grant_type": "password",
      "client_id": "android",
      "client_secret": "myClientSecret",
      "username": username,
      "password": password
    }

    let body = JSON.stringify(data);
    let head = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.id_secret_Url, body, { headers: head })
      // ...and calling .json() on the response to return data
      .map((res) => res.json())
      //..errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }


}
