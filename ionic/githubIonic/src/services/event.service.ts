import { UrlProvider } from './../util/url-provider';
//imports
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
//import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class EventService {
  // Resolve HTTP using the constructor
  constructor(private http: Http, private authService: AuthService) { }
  // private instance variable to hold base url
  private Url = UrlProvider.url + '/api/events';

  // post event to server
  createEvent(title, time, endTime, venue, description, location, imageBinary): Observable<any> {
    //pass the parameter to the data properties
    let data = {
      "title": title,
      "time": time,
      "endTime": endTime,
      "venue": venue,
      "description": description,
      "location": location,
      "imageBinary": null
    }

    if (imageBinary) {
      data.imageBinary = imageBinary;
    }
    //place data object in readable JSON format to be sent to the server
    let body = JSON.stringify(data);

    return this.http.post(this.Url, body, this.getHeaders())
      // call json to the response object
      .map((res) => res.json())
      // handle errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }

  // method to get all events created by a user
  getUserEvents(id) {
    return this.http.get(this.Url + '/user-events/' + id, this.getHeaders())
      .map((res: Response) => res.json());
  }

  getAllEvents() {
    return this.http.get(this.Url + '/timeline', this.getHeaders())
      .map((res: Response) => res.json());
  }
  //delete a specific event by it's id
  deleteEvent(id) {
    return this.http.delete(this.Url + '/' + id, this.getHeaders())
      .map((res: Response) => res.json())

  }

  private getHeaders() {
    // create authorization header with token
    let currentUser = localStorage.getItem('user-token');
    if (currentUser) {
      let headers = new Headers({
        'Authorization': 'Bearer ' + currentUser,
        'Content-Type': 'application/json',
      });
      return new RequestOptions({ headers: headers });
    }
  }
}


