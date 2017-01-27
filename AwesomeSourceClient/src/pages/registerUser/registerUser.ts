import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../shared/shared';

@Component({
  selector: 'page-register-user',
  templateUrl: 'registerUser.html'
})
export class RegisterUser {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private user: User) {
  }

  registerUser () {

  }
}
