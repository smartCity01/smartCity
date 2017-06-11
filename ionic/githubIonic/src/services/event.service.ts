//imports
import { User } from './../model/user';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
//import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
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
           //pass the parameter to the data properties
            let data = {
                "title": title,
                "time": time,
                "endTime": endTime,
                "venue": venue
            }
            //place data object in readable JSON format to be sent to the server
            let body = JSON.stringify(data); 
           

return this.http.post(this.Url,body, this.auth())
        // call json to the response object
        .map((res) => res.json())
        // handle errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
}
       
    

// method to get all events created by a user

   getUserEvents(){
     return this.http.get(this.Url , this.auth())
     .map((res: Response) => res.json());
   
   }
  
    getAllEvents() {
    // specify the content header
            let head = new Headers({
                'Content-Type': 'application/json',
                    });
                     return this.http.get(this.Url , head)
     .map((res: Response) => res.json());
    }

    
 
   private auth() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token,
            'Content-Type': 'application/json', });
            return new RequestOptions({ headers: headers });
        }
    }
}


