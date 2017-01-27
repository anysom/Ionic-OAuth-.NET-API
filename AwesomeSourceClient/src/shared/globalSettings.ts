import { Injectable } from "@angular/core";
import { InAppBrowser } from 'ionic-native';
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class GlobalSettings {

  private apiUrl = 'http://localhost:52146';
  //private apiUrl = 'http://localhost:50203';


  constructor (private http: Http) {}

  getSettings () {
    return {
      apiUrl: this.apiUrl
    };
  }
}
