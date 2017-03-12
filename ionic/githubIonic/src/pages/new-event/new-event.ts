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

    constructor(public viewCtrl: ViewController, public modalCtrl: ModalController) { }


    create() {
        console.log(this.title);
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }

}

