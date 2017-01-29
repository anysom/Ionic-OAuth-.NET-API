import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import {ReplaySubject} from 'rxjs/Rx';

import { GlobalSettings } from "./shared";

@Injectable()
export class Values {

  private baseUrl;

  private accessTokenSubject:ReplaySubject<any> = new ReplaySubject(1);

  constructor (private http: Http, private globalSettings: GlobalSettings) {
    // Set the baseUrl variable to the Api Url from the GlobalSettings
    this.baseUrl = globalSettings.getSettings().apiUrl;
  }


  getValues (accessToken) {
    // Construct header that supplies the access token
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + accessToken);

    return this.http.get(this.baseUrl + '/api/Values', {headers: headers});
  }

}
