import { RefresherService } from './../../services/refresher.service';
import { AccountService } from './../../util/account.service';
import { Event } from './../../model/event';
import { EventService } from './../../services/event.service';
import { NewEventPage } from './../new-event/new-event';
import { Component } from '@angular/core';

import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { EventDetailsPage } from '../event-details/event-details';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  events: Event[] = [];
  loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public eventService: EventService,
    public loadCtrl: LoadingController,
    private accountService: AccountService,
    private refresherService: RefresherService) {
    this.loading = loadCtrl.create();
    this.fetchTimelineEvents(() => { });
    refresherService.refresher.subscribe(a => {
      if (accountService.isLoggedIn()) {
        this.fetchTimelineEvents(() => { });
      }
    });

  }

  fetchTimelineEvents(afterFetch: Function) {
    this.eventService.getAllEvents().subscribe(response => {
      this.loading.dismiss();
      afterFetch();
      this.events = [];
      response.forEach(eventFromBackend => {
        this.events.push(new Event(eventFromBackend.title,
          eventFromBackend.hostName,
          eventFromBackend.host,
          eventFromBackend.time,
          eventFromBackend.endtime,
          eventFromBackend.venue,
          eventFromBackend.description,
          eventFromBackend._id,
          eventFromBackend.imageUrl,
          eventFromBackend.commentCount));
      });
    }, err => {
      console.log(err);
      this.loading.dismiss();
    })
  }

  doRefresh(refresher) {
    this.fetchTimelineEvents(() => refresher.complete())
  }

  createNewEvent() {
    let modal = this.modalCtrl.create(NewEventPage);
    modal.present();
  }
}
