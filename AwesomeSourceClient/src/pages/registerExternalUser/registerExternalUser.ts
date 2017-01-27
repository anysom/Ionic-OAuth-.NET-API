import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User, Authentication } from '../../shared/shared';

import { ValuesPage } from '../values/values';

@Component({
  selector: 'page-register-user',
  templateUrl: 'registerExternalUser.html'
})
export class RegisterExternalUser {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authentication: Authentication,
              private user: User) {
  }

  registerUser () {
    let username = 'anders@anysom.dk';
    this.user.registerExternalUser(this.authentication.getAccessToken(), username)
    .subscribe( response => {
      console.log('registered external user', response);
      this.navCtrl.push(ValuesPage);
    });
  }
}
