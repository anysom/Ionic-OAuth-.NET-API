import { Injectable } from "@angular/core";

@Injectable()
export class GlobalSettings {

  private apiUrl = 'http://localhost:52146';
  //private apiUrl = 'http://localhost:50203';


  constructor () {}

  getSettings () {
    return {
      apiUrl: this.apiUrl
    };
  }
}
