import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  seconds: number = 90;
  teamSize: number = 2;
  constructor() {
   }

  setTime(seconds) {
    this.seconds = seconds;
  }

  getTime() {
    return this.seconds;
  }

  setTeamSize(size) {
    this.teamSize = size;
  }

  getTeamSize() {
    return this.teamSize;
  }


}
