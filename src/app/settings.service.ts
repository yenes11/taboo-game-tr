import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  seconds: number = 90;
  teamSize: number = 2;
  teamNames = ["Takım-0", "Takım-1"];
  rounds = 5;

  constructor() {
   }

  setRounds(rounds) {
    this.rounds = rounds;
  }

  getRounds() {
    return this.rounds;
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

  getTeamNames() {
    return this.teamNames;
  }

  setTeamNames(teamNames) {
    this.teamNames = teamNames;
  }

}
