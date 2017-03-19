import { AuthService } from './../services/auth.service';
import { UserService } from './../services/users.service';
import { NewEventPage } from './../pages/new-event/new-event';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyApp } from './app.component';
import { LocationsPage } from '../pages/locations/locations';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
@NgModule({
  declarations: [
    MyApp,
    LocationsPage,
    EventDetailsPage,
    ListPage,
    LoginPage,
    ProfilePage,
    SignupPage,
    NewEventPage
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
    ListPage,
    LoginPage,
    ProfilePage,
    SignupPage,
    NewEventPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },UserService,AuthService]
})
export class AppModule { }
