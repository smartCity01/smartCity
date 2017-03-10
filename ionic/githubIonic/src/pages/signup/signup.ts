import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'signup',
    templateUrl: 'signup.html'
})
export class SignupPage {

    constructor(public viewCtrl: ViewController) {

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}