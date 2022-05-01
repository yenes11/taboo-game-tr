import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  subscription: Subscription;
  outputSeconds: number = 90;
  outputTeamSize: number = 2;

  public constructor(private settingsService: SettingsService, private router: Router) {

  }


  sendTeamSize() {
    this.settingsService.setTeamSize(this.outputTeamSize);
  }

  ngOnInit() {
    this.settingsService.setTime(this.outputSeconds);
  }

  sendTime() {
    this.settingsService.setTime(this.outputSeconds);
    console.log(this.outputSeconds)
  }

  goToHomepage() {
    this.router.navigate(['/home']);
  }

}
