import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyApp } from './app.component';
import { LocationsPage } from '../pages/locations/locations';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { ListPage } from '../pages/list/list';
import { HttpModule, JsonpModule } from '@angular/http'; //T 

// T- Imports for loading and configuring the in-memory web api 
//import { InMemoryWebApiModule} from 'angular-in-memory-web-api';// <?
import { AuthService} from '../services/auth.service';
import { UserService} from '../services/users.service';

@NgModule({
  declarations: [
    MyApp,
    LocationsPage,
    EventDetailsPage,
    ListPage,
    LoginPage,
    SignupPage,
   
  ],
  imports: [
    IonicModule.forRoot(MyApp),
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
    ListPage,
    LoginPage,
    SignupPage
  ],
  //providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler},AuthService, UserService ] //T
  
})
export class AppModule { }
