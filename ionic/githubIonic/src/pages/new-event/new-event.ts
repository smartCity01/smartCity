import { RefresherService } from './../../services/refresher.service';
import { EventService } from './../../services/event.service';
//import { EventDetailsPage } from './../event-details/event-details';
import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ViewController, ModalController, ToastController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'new-event',
  templateUrl: 'new-event.html'
})

export class NewEventPage {
  @ViewChild('display', { read: ElementRef }) inputElement: ElementRef;
  title: String;
  time: number;
  endTime: number;
  venue: String;
  description: String;
  geocoder = new google.maps.Geocoder();
  service = new google.maps.places.AutocompleteService();
  predictions;


  constructor(
    public eventService: EventService,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private refresherService: RefresherService,
    private cd: ChangeDetectorRef
  ) { }


  onInputPress(event) {
    if (!event.target.value) {
      this.predictions = null;
    }
    let value = event.target.value;
    if (value) {
      this.service.getPlacePredictions({ input: event.target.value }, (predictions, status) => {
        this.predictions = predictions;
        this.cd.detectChanges();
      });
    }
  }


  //method to create event
  create() {
    console.log(this.venue);
    this.eventService.createEvent(this.title, this.time, this.endTime, this.venue, this.description).subscribe(res => {
      this.viewCtrl.dismiss();
      let toast = this.toastCtrl.create({
        message: 'New Event Created',
        duration: 3000,
        position: 'top'
      })
      toast.present();
      this.refresherService.refresh();
    },
      err => {
        console.log('failed to create event');
      }
    );
  }

  clickedLocation(prediction) {
    this.venue = prediction.description;
    this.predictions = null;
    this.geocoder.geocode({ 'placeId': prediction.place_id }, (responses, status) => {
      if (status == 'OK') {
        var lat = responses[0].geometry.location.lat();
        var lng = responses[0].geometry.location.lng();
        console.log(lat, lng);
      }
    });
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}

