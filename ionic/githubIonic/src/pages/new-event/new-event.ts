import { Event } from './../../model/event';
import { EventService } from './../../services/event.service';
//mport { EventDetailsPage } from './../event-details/event-details';
import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';



@Component({
    selector: 'new-event',
    templateUrl: 'new-event.html'
})

export class NewEventPage {
    title: String;
    time: number;
    endTime: number;
    venue: String;
    success:"Event was created successfully" 
    error:"Error! unable to create event"
    constructor(public eventService:EventService, 
    public viewCtrl: ViewController, public modalCtrl: ModalController) { }

   //method to create event
    create() {
       this.eventService.createEvent(this.title, this.time, this.endTime,this.venue).subscribe(res => {

    console.log(this.success);
          
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

