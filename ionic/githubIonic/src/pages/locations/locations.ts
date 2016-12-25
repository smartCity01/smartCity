import { Component } from '@angular/core';


@Component({
  selector: 'locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {
  lat: number = 45.2545229;
  lng: number = -75.7275567;
  constructor() {

  }
}
