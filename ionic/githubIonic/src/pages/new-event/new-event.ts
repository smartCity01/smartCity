import { RefresherService } from './../../services/refresher.service';
import { Event } from './../../model/event';
import { EventService } from './../../services/event.service';
//import { EventDetailsPage } from './../event-details/event-details';
import { Component } from '@angular/core';
import { ViewController, ModalController, ToastController } from 'ionic-angular';



@Component({
    selector: 'new-event',
    templateUrl: 'new-event.html'
})

export class NewEventPage {
    title: String;
    time: String; 
    endTime: String;
    venue: String;
    description: String;
    success = "Event was created successfully";
    error = "Error! unable to create event";
    constructor(
        public eventService: EventService,
        public viewCtrl: ViewController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        private refresherService: RefresherService
    ) { }

    //method to create event
    create() {
        this.eventService.createEvent(this.title, this.time, this.endTime, this.venue, this.description).subscribe(res => {
            this.viewCtrl.dismiss();
            let toast = this.toastCtrl.create({
                message: 'New Event Created',
                duration: 3000,
                position: 'top'
            })
            toast.present();
            this.refresherService.refresher.next(0);
        },
            err => {
                console.log(this.error);
            }
        );
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }

}

