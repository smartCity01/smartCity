import { Event } from './../../model/event';
import { EventService } from './../../services/event.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'locations-page',
  templateUrl: 'locations.html'
})
export class LocationsPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  loading;
  events: Event[];
  backendEvents;

  constructor(
    public navCtrl: NavController,
    public eventService: EventService,
    public loadCtrl: LoadingController) {
    this.loading = loadCtrl.create();
  }

  ionViewDidLoad() {
    this.loadMap();
    this.fetchMapEvents();
  }

  addMarker() {

    /*  let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });
      let content = "<h4>Information!</h4>";

      this.addInfoWindow(marker, content);*/
    this.fetchMapEvents();

  }

  fetchMapEvents() {
    this.eventService.getAllEvents().subscribe(response => {
      this.loading.dismiss();
      if (this.backendEvents !== response) {
        this.backendEvents = response;
        this.events = [];
        response.forEach(eventFromBackend => {
          this.events.push(new Event(
            eventFromBackend.title,
            eventFromBackend.hostName,
            eventFromBackend.host,
            eventFromBackend.time,
            eventFromBackend.endtime,
            eventFromBackend.venue,
            eventFromBackend.description,
            eventFromBackend.id,
            eventFromBackend.imageUrl));
          this.createMarkerForEvent(eventFromBackend);
        });

      }
    }, err => {
      console.log(err);
      this.loading.dismiss();
    })
  }

  createMarkerForEvent(event) {
    if (event.location) {
      let marker = new google.maps.Marker({
        position: { lat: event.location.latitude, lng: event.location.longitude },
        map: this.map,
        title: event.title
      });
      let content = "<h4>" + event.title + "</h4>";

      this.addInfoWindow(marker, content);
    }
  }

  loadMap() {

    Geolocation.getCurrentPosition().then((position) => {

      console.log(position.coords.latitude, position.coords.longitude);

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
          }
        ]
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

}
