import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ReplaySubject } from 'rxjs/Rx';

import { GlobalSettings } from "./shared";

@Injectable()
export class User {

  private baseUrl;

  private accessTokenSubject:ReplaySubject<any> = new ReplaySubject(1);

  constructor (private http: Http, private globalSettings: GlobalSettings) {
    // Set the baseUrl variable to the Api Url from the GlobalSettings
    this.baseUrl = globalSettings.getSettings().apiUrl;
  }


  getUserInfo (accessToken) {
    // Construct header that supplies the access token
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + accessToken);

    return this.http.get(this.baseUrl + '/api/Account/UserInfo', {headers: headers})
    .map( response => {
      let body = JSON.parse(response["_body"]);
      return body;
    });
  }

  // Registers a user in the Web Api using federated login provider (Facebook)
  // A user must be registered before it can retrieve protected resources.
  registerExternalUser (accessToken, username) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Authorization', 'Bearer ' + accessToken);
    let options = new RequestOptions({ headers: headers });

    /*var registerUserData = {
			Email: username
		};*/
    let registerUserData = 'Email=' + encodeURIComponent(username);
    // Perform request
    return this.http.post(this.baseUrl + '/api/Account/RegisterExternal', registerUserData, options);
  }

  // Registers a user in the Web Api using username/password.
  // A user must be registered before it can retrieve protected resources.
  registerLocalUser (accessToken, userCredentials) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Authorization', 'Bearer ' + accessToken);
    let options = new RequestOptions({ headers: headers });

    var registerUserData = {
			Email: userCredentials.username,
			Password: userCredentials.password,
			ConfirmPassword: userCredentials.password
		};

    // Perform request
    return this.http.post(this.baseUrl + '/api/Account/Register', registerUserData, options);
  }

}
