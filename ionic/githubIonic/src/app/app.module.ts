import { ImagePicker } from '@ionic-native/image-picker';
import { EventInfo } from './../pages/event-info/event-info';
import { SettingsPage } from './../pages/settings/settings';
import { CommentPage} from './../pages/comment/comment';
import { RefresherService } from './../services/refresher.service';
import { AccountService } from './../util/account.service';
import { EventService } from './../services/event.service';
import { ProfilePage } from './../pages/profile/profile';
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/users.service';
import { NewEventPage } from './../pages/new-event/new-event';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyApp } from './app.component';
import { LocationsPage } from '../pages/locations/locations';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { ListPage } from '../pages/list/list';
import { HttpModule, JsonpModule } from '@angular/http'; //T
import { File } from '@ionic-native/file';
import { CommentService} from './../services/comment.service';
// T- Imports for loading and configuring the in-memory web api
//import { InMemoryWebApiModule} from 'angular-in-memory-web-api';// <?


@NgModule({
  declarations: [
    MyApp,
    LocationsPage,
    EventDetailsPage,
    CommentPage,
    ListPage,
    LoginPage,
    ProfilePage,
    SignupPage,
    NewEventPage,
    SettingsPage,
    EventInfo
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule, //T
    //InMemoryWebApiModule.forRoot(UsersService), //T < ??
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAERgyQu6HKSwcPv0uwOGOvsIbYQKfsn5Y'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LocationsPage,
    EventDetailsPage,
    CommentPage,
    ListPage,
    ProfilePage,
    SettingsPage,
    LoginPage,
    SignupPage,
    NewEventPage
  ],
  //providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    UserService,
    CommentService,
    AccountService,
    EventService,
    ImagePicker,
    File,
    RefresherService] //T

})
export class AppModule { }
