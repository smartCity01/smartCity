// Imports
import { Injectable } from '@angular/core';
//import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Http, Response, Headers} from '@angular/http';
import {User} from  '../src/Model/user' ;
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
// Resolve HTTP using the constructor
constructor (private http: Http, private authService: AuthService) {}
// private instance variable to hold base url
private id_secret_Url = 'http://localhost:1337/api/users/';

// Fetch all existing IDs and Secrets
getUsers() : Observable<any> {

    // ..using get Request Options
    return this.http.get(this.id_secret_Url)
        // ...and calling .json() on the response to return data
        .map((res) => res.json())
        //..errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
}

signUp (username, password, email)
{
   this.authService.getSignUpToken().subscribe(response =>{
       let token = response.access_token ;

        let data = {
            "username": username,
            "password" : password,
            "email" : email 
        }
        let body = JSON.stringify(data); //put the data in a string form so it can be easily sent
        let head = new Headers({
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer '+ token
        });
        this.http.post(this.id_secret_Url,body, {headers: head})
        // ...and calling .json() on the response to return data
        .map((res) => res.json())
        //..errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')).subscribe();
   }) 
}


}
