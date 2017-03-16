import { Component } from '@angular/core';
import { UserService} from '../../services/users.service';
@Component({
    selector: 'signup',
    templateUrl: 'signup.html'
})
export class SignupPage {
    username;
    password;
    email;
    constructor (
        private userService: UserService
    ){}
    signUp()
    {
        this.userService.signUp(this.username, this.password, this.email);
    }
}