import { Injectable } from "@angular/core";
import { InAppBrowser } from 'ionic-native';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ReplaySubject, AsyncSubject } from 'rxjs/Rx';

import { FacebookAuthentication, CredentialsAuthentication } from "./shared";

@Injectable()
export class Authentication {

  private accessTokenSubject:AsyncSubject<any>;
  private accessToken = null;

  constructor (
    private http: Http,
    private credentialsAuthentication: CredentialsAuthentication,
    private facebookAuthentication: FacebookAuthentication) {
      
    }

  getAccessToken () {
    return this.accessToken;
  }

  facebookLogin () {
    // IF the access token subject is already set, just return it again
    if (this.accessTokenSubject) {
      return this.accessTokenSubject;
    }
    // Else instantiate a new subject and perform login request
    this.accessTokenSubject = new AsyncSubject();

    this.facebookAuthentication.login()
    .subscribe(accessToken => {
      // Cache the access token in the service
      this.accessToken = accessToken;

      // Set the access token as the result for the observerable
      this.accessTokenSubject.next(accessToken);
      this.accessTokenSubject.complete();
    });

    return this.accessTokenSubject;
  }

  credentialsLogin (credentials) {
    // IF the access token subject is already set, just return it again
    if (this.accessTokenSubject) {
      return this.accessTokenSubject;
    }
    // Else instantiate a new subject and perform login request
    this.accessTokenSubject = new AsyncSubject();

    this.credentialsAuthentication.login(credentials)
    .subscribe(accessToken => {
      // Cache the access token in the service
      this.accessToken = accessToken;

      // Set the access token as the result for the observerable
      this.accessTokenSubject.next(accessToken);
      this.accessTokenSubject.complete();
    });

    return this.accessTokenSubject;
  }
}
