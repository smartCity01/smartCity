//imports
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
//import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Http, Response, Headers } from '@angular/http';
import { User } from '../src/Model/user';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class EventService {
    // Resolve HTTP using the constructor
    constructor(private http: Http, private authService: AuthService) { }
    // private instance variable to hold base url
    private Url = 'http://localhost:1337/api/events';


// post event to server
createEvent(title, time, endTime, venue): Observable<any> {
       
            let data = {
                "title": title,
                "time": time,
                "endTime": endTime,
                "venue": venue
            }
            //place data in readable JSON format for the server
            let body = JSON.stringify(data); 
            let head = new Headers({
                'Content-Type': 'application/json',
                    });

return this.http.post(this.Url,body, {headers: head})
        // call json to the response object
        .map((res) => res.json())
        // handle errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
}
       
    

// method to get all events created by a user
    getUserEvents() {

    }

    
 
   
}
