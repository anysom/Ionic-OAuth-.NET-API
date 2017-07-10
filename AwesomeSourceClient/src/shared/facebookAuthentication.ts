import { Injectable } from "@angular/core";
import { InAppBrowser } from 'ionic-native';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import {ReplaySubject} from 'rxjs/Rx';

import { GlobalSettings } from "./shared";

@Injectable()
export class FacebookAuthentication {

  private baseUrl;
  private accessTokenSubject:ReplaySubject<any> = new ReplaySubject(1);

  constructor (private http: Http, private globalSettings: GlobalSettings) {
    // Set the baseUrl variable to the Api Url from the GlobalSettings
    this.baseUrl = globalSettings.getSettings().apiUrl;
  }

  // Helper method for fetching the registered login provider options from the API.
  // Every login option will come with a URL matching an endpoint on the backend which must be called
  // to retrieve the login screen for the federated login.
  private getExternalLoginUrl = function () {
    // Return URL for an HTML app is just a local page. This page does NOT need to exist in the app.
    var returnUrl = 'http:%2F%2Flocalhost%2Fcallback';
    return this.http.get(this.baseUrl + '/api/Account/ExternalLogins?returnUrl=' + returnUrl + '&generateState=true')
    .map( response => {
      // In this instance I am just returning the URL for the Facebook login
      let data = response.json()[0];
      return data.Url || data.url;
    });
  }

  // Helper method for getting the external login screen from the Federated login provider
  private getExternalLoginScreen = function (url) {
    let loginScreenSubject = new ReplaySubject(1);
    let browser = new InAppBrowser(this.baseUrl + url, '_blank', 'location=no,toolbar=no,hardwareback=no,EnableViewPortScale=yes');

    // When the browser is done loading, retrieve the access token and close the
    // InAppBrowser again.
    browser.on("loadstop")
    .subscribe((e) => {
      // If i can extract an access token from the query string, save it and close the window.
      let accessTokenQueryParams = e.url.match(/\#(?:access_token)\=([\S\s]*?)\&/);
      if (accessTokenQueryParams != null) {
        let accessToken = accessTokenQueryParams[1];
        browser.close();

        loginScreenSubject.next(accessToken);
        loginScreenSubject.complete();
      }
    },
    err => {
      console.log("InAppBrowser Loadstop Event Error: " + err);
    });

    return loginScreenSubject;
  }

  // Checks if a user already exists in the Web Api
  private isUserRegistered = function () {

  }

  // Registers a user in the Web Api.
  // A user must be registered before it can retrieve protected resources.
  private registerUser = function (accessToken) {

  }


  // Public function for loggin in with facebook
  login () {
    console.log('calling facebook login');
    // Create an observerable which is a flattened call
    // to the getExternalLoginUrl and getExternalLoginScreen helper methods
    var accessTokenObservarable = this.getExternalLoginUrl()
    .flatMap( url => this.getExternalLoginScreen(url));

    accessTokenObservarable.subscribe(
      accessToken => {
      this.accessTokenSubject.next(accessToken);
      this.accessTokenSubject.complete();
    },
    err => {
      console.log("InAppBrowser Loadstop Event Error: " + err);
    });

    return this.accessTokenSubject;
  };

  logout () {
    // Open a browser window that cleares the InAppBrowser cache in order to forget the entered Facebook credentials.
    // The URL for the page does not have to be an existing page.
    // The important stuff here is just that the window is opened and the cahce cleared
    let browser = new InAppBrowser('/logout', '_blank', 'location=no,toolbar=no,hardwareback=no,EnableViewPortScale=yes,clearcache=yes,clearsessioncache=yes');

    browser.on("loadstop")
    .subscribe((e) => {
     browser.close();
    },
    err => {
      console.log("InAppBrowser Loadstop Event Error: " + err);
    });
  }
}
