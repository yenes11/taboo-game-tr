import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router: Router) { }
  outputSeconds: number = 0;

  subject = new BehaviorSubject<number>(this.outputSeconds);

  ngOnInit() {

  }

  sendTime(): Observable<number> {
    return this.subject.asObservable();
  }

  goToHomepage() {
    this.router.navigate(['/home']);
  }

}
