import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ReplaySubject, AsyncSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { FacebookAuthentication, CredentialsAuthentication, GlobalSettings } from "./shared";

@Injectable()
export class Authentication {

  private baseUrl;
  private accessTokenSubject:AsyncSubject<any>;
  private accessToken = null;

  constructor (
    private http: Http,
    private credentialsAuthentication: CredentialsAuthentication,
    private facebookAuthentication: FacebookAuthentication,
    private storage: Storage,
    private globalSettings: GlobalSettings) {
      // Set the baseUrl variable to the Api Url from the GlobalSettings
      this.baseUrl = globalSettings.getSettings().apiUrl;
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

      // Save the access token in storage
      this.storage.set('accessToken', accessToken);

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

      // Save the access token in storage
      this.storage.set('accessToken', accessToken);

      // Set the access token as the result for the observerable
      this.accessTokenSubject.next(accessToken);
      this.accessTokenSubject.complete();
    });

    return this.accessTokenSubject;
  }

  logout () {
    // Construct request header
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Authorization', 'Bearer ' + this.accessToken);
    let options = new RequestOptions({ headers: headers });

    // Clear the saved accessToken
    this.storage.set('accessToken', null);
    this.accessToken = null;
    // Clear subject
    this.accessTokenSubject = null;
    // Remove saved credentials from Facebook login service
    this.facebookAuthentication.logout();

    // Perform request
    return this.http.post(this.baseUrl + '/api/Account/Logout', null, options);
  }
}
