import { SettingsPage } from './../settings/settings';
import { RefresherService } from './../../services/refresher.service';
import { EventService } from './../../services/event.service';
import { EventDetailsPage } from './../event-details/event-details';
import { Event } from './../../model/event';
import { UserService } from './../../services/users.service';
import { User } from './../../model/user';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  currentUser;
  events: Event[];
  loader;
  success="Event Deleted"
  err="Error"
  id:String;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public eventService: EventService,
    public userService: UserService,
    private loadingCtrl: LoadingController,
    private refresherService: RefresherService) {
    this.loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading Please Wait...'
    });

    if (!this.contentsLoaded()) {
      this.loader.present();
    }
    this.fetchEvents();
    if (!localStorage.getItem('userData')) {
      this.userService.getUserInfo().subscribe(response => {
        localStorage.setItem('userData', JSON.stringify(response));
        this.currentUser = JSON.parse(localStorage.getItem('userData'));
        if (this.contentsLoaded()) {
          this.loader.dismiss();
        }
      });
    } else {
      this.currentUser = JSON.parse(localStorage.getItem('userData'));
    }

    refresherService.refresher.subscribe(() => {
      this.fetchEvents();
    });
  }
  fetchEvents() {
    this.eventService.getUserEvents().subscribe(response => {
      this.events = [];
      response.forEach(res => {
        localStorage.setItem('eventData', JSON.stringify(res));
        let eventData = JSON.parse(localStorage.getItem('eventData'));
        
         this.events.push(new Event(eventData.title, null, null, null,eventData._id));
      })
      if (this.contentsLoaded()) {
        this.loader.dismiss();
      }
    }, err => {
      console.log(err);
    })
  }
  deleteEvent(id){
 this.eventService.deleteEvent(id).subscribe(response => {
   
      console.log(this.success);
         },
      err => {
       console.log(this.err);
      }
    );

  }
  itemTapped(event) {
    this.navCtrl.push(EventDetailsPage, {
      item: event
    });
  } 
  displaySettings() {
    this.navCtrl.push(SettingsPage);
  }

  contentsLoaded() {
    return localStorage.getItem('userData') && this.events;
  }
}
