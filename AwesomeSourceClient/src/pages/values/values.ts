import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User, Values, Authentication } from '../../shared/shared';

@Component({
  selector: 'page-values',
  templateUrl: 'values.html'
})
export class ValuesPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authentication: Authentication,
              private values: Values) {
  }

  getValues () {
    this.values.getValues(this.authentication.getAccessToken())
    .subscribe( response => {
      console.log('values page, get values', response);
    });
  }
}
