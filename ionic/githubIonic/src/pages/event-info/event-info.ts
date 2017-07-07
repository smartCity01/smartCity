import { EventDetailsPage } from './../event-details/event-details';
import { Event } from './../../model/event';
import { ProfilePage } from './../profile/profile';
import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'event-info',
  templateUrl: 'event-info.html'
})
export class EventInfo {
  @Input() event: Event;

  constructor(
    public navCtrl: NavController
  ) { }

  displayProfile() {
    this.navCtrl.push(ProfilePage, {
      id: this.event.hostId
    })
  }

  itemTapped(event) {
    this.navCtrl.push(EventDetailsPage, {
      item: event
    });
  }
}
