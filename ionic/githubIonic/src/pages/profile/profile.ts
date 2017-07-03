import { SettingsPage } from './../settings/settings';
import { RefresherService } from './../../services/refresher.service';
import { EventService } from './../../services/event.service';
import { EventDetailsPage } from './../event-details/event-details';
import { Event } from './../../model/event';
import { UserService } from './../../services/users.service';
import { User } from './../../model/user';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  ModalController, LoadingController } from 'ionic-angular';


@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  currentUser: User;
  events: Event[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public eventService: EventService,
    private refresherService: RefresherService) {
    this.fetchEvents();
    refresherService.refresher.subscribe(() => {
      this.fetchEvents();
    });
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('userData'));
  }

  fetchEvents() {
    this.eventService.getUserEvents().subscribe(response => {
      this.events = [];
      response.forEach(event => {
        this.events.push(new Event(event.title, null, null, null));
      })
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
  }
