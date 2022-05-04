import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';
import { IonModal } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  teamNames = [];
  playTime = 0;
  rounds: number;


  constructor(private router: Router, private settingsService: SettingsService) { }

  startGame(): void {
    console.debug();
    this.teamNames = this.settingsService.getTeamNames();
    this.playTime = this.settingsService.getTime();
    this.rounds = this.settingsService.getRounds();
    const content = document.querySelector('#content-1');
    content.classList.add('blur');

  }

  goToGame() {
    const modal = document.querySelector('#modal-1') as unknown as IonModal;
    const content = document.querySelector('#content-1');
    modal.dismiss();
    content.classList.remove('blur');
    this.router.navigate(['/game']);
  }



  goToSettings() {
    this.router.navigate(['/settings']);
  }

}
