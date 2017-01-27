import { Injectable } from "@angular/core";
import { InAppBrowser } from 'ionic-native';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ReplaySubject } from 'rxjs/Rx';

import { GlobalSettings } from "./shared";

@Injectable()
export class CredentialsAuthentication {

  private baseUrl;
  private accessTokenSubject:ReplaySubject<any> = new ReplaySubject(1);

  constructor (private http: Http, private globalSettings: GlobalSettings) {
    // Set the baseUrl variable to the Api Url from the GlobalSettings
    this.baseUrl = globalSettings.getSettings().apiUrl;
  }

  login (credentials) {
    // Construct data
    let loginData = 'grant_type=password&username=' + credentials.username + '&password=' + credentials.password;

    // Construct POST Headers
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    // Perform request
    return this.http.post(this.baseUrl + '/Token', loginData, options)
    .map( response => {
      let body = JSON.parse(response["_body"]);
      return body.access_token;
    });
  }
}
