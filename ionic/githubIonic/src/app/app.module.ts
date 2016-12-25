import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyApp } from './app.component';
import { LocationsPage } from '../pages/locations/locations';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { ListPage } from '../pages/list/list';

@NgModule({
  declarations: [
    MyApp,
    LocationsPage,
    EventDetailsPage,
    ListPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAERgyQu6HKSwcPv0uwOGOvsIbYQKfsn5Y'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LocationsPage,
    EventDetailsPage,
    ListPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
