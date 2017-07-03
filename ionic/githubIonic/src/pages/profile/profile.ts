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
      response.forEach(event => {
        this.events.push(new Event(event.title, null, null, null));
      })
      if (this.contentsLoaded()) {
        this.loader.dismiss();
      }
    }, err => {
      console.log(err);
    })
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
