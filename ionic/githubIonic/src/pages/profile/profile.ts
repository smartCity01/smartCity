import { SettingsPage } from './../settings/settings';
import { RefresherService } from './../../services/refresher.service';
import { EventService } from './../../services/event.service';
import { EventDetailsPage } from './../event-details/event-details';
import { Event } from './../../model/event';
import { UserService } from './../../services/users.service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController, ToastController } from 'ionic-angular';


@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  currentUser;
  events: Event[];
  loader;
  id: String;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public eventService: EventService,
    public userService: UserService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private refresherService: RefresherService) {
    if (navParams.get('id')) {
      this.id = navParams.get('id');
    }
    if (!this.contentsLoaded()) {
      this.createAndPresentLoader();
    }

    if (!this.id) {
      if (!localStorage.getItem('userData')) {
        this.userService.getCurrentUserInfo().subscribe(response => {
          localStorage.setItem('userData', JSON.stringify(response));
          this.currentUser = JSON.parse(localStorage.getItem('userData'));
          this.fetchEvents();
          if (this.contentsLoaded()) {
            this.loader.dismiss();
          }
        });
      } else {
        this.currentUser = JSON.parse(localStorage.getItem('userData'));
        this.fetchEvents();
      }
    } else {
      this.userService.getUserInfo(this.id).subscribe(response => {
        this.currentUser = response.user;
        this.fetchEvents();
        if (this.contentsLoaded()) {
          this.loader.dismiss();
        }
      });
    }

    refresherService.refresher.subscribe(() => {
      this.fetchEvents();
    });
  }

  createAndPresentLoader() {
    this.loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading Please Wait...'
    });
    this.loader.present();
  }

  isUsersProfile() {
    return !this.id || this.id === JSON.parse(localStorage.getItem('userData'))._id;
  }

  fetchEvents() {
    this.eventService.getUserEvents(this.currentUser._id).subscribe(response => {
      this.events = [];
      response.forEach(res => {
        this.events.push(new Event(res.title, res.hostName, res.host, res.time, res.endtime, res.venue, res.description, res._id));
      })
      if (this.contentsLoaded()) {
        this.loader.dismiss();
      }
    }, err => {
      console.log(err);
    })
  }

  deleteEvent(id) {
    let successMessage = "Event Deleted";
    let errorMessage = "Failed to delete event";

    this.createAndPresentLoader();
    this.eventService.deleteEvent(id).subscribe(() => {
      let toast = this.toastCtrl.create({
        message: successMessage,
        duration: 3000,
        position: 'top'
      })
      toast.present();
      this.fetchEvents();
      this.refresherService.refresh();
    },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Error !',
          subTitle: errorMessage,
          buttons: ['OK']
        });
        alert.present();
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
    return this.currentUser && this.events;
  }
}
