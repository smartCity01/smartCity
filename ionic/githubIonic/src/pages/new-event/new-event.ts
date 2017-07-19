import { RefresherService } from './../../services/refresher.service';
import { EventService } from './../../services/event.service';
//import { EventDetailsPage } from './../event-details/event-details';
import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ViewController, ModalController, ToastController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import * as cloudinary from 'cloudinary';
import { File } from '@ionic-native/file';
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
  location;
  imageBinary;
  imageFileUrl;
  geocoder = new google.maps.Geocoder();
  service = new google.maps.places.AutocompleteService();
  predictions;


  constructor(
    public eventService: EventService,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public imagePicker: ImagePicker,
    private refresherService: RefresherService,
    private file: File,
    private cd: ChangeDetectorRef
  ) {
  }


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

  addImage() {
    let options = { maximumImagesCount: 1 };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageFileUrl = results[i];
        console.log(results[i]);
        console.log(this.file.dataDirectory);
      }
    }, (err) => { });
  }

  clearImage() {
    this.imageFileUrl = null;
  }


  //method to create event
  create() {
    if (this.imageFileUrl) {
      this.file.resolveLocalFilesystemUrl('file://' + this.imageFileUrl).then(url => {
        console.log(url.filesystem.root.nativeURL);
        this.file.readAsBinaryString(url.filesystem.root.nativeURL, url.name).then(binary => {
          this.imageBinary = 'data:image/jpg;base64,' + btoa(binary);
          this.createEvent();
        }, err => {
          console.log(err);
        });
      });
    } else {
      this.createEvent();
    }

  }

  createEvent() {
    this.eventService
      .createEvent(this.title, this.time, this.endTime, this.venue, this.description, this.location, this.imageBinary).subscribe(res => {
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
    this.cd.detectChanges();
    this.geocoder.geocode({ 'placeId': prediction.place_id }, (responses, status) => {
      if (status == 'OK') {
        this.cd.detectChanges();
        var lat = responses[0].geometry.location.lat();
        var lng = responses[0].geometry.location.lng();
        this.location = {
          latitude: lat,
          longitude: lng
        }
      }
    });

  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}

