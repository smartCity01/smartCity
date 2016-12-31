import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {
  lat: number;
  lng: number;
  constructor() {
    Geolocation.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    }),
      err => {
        //do nothing
      }
  }
}
