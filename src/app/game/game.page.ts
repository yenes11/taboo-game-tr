import { Component, OnInit } from '@angular/core';
import { Components } from '@ionic/core';
import { words } from './words';
import { Word } from './word';
import { Subscription } from 'rxjs';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';


@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],

})
export class GamePage implements OnInit {
  words: Word[] = this.shuffle(words);
  subscription: Subscription;
  playTime: number = 90;
  teamSize: any = 2;
  teamNames;
  scoresBoard = [];
  index = 0;
  secondCard = document.querySelector('#card-second');
  thirdCard = document.querySelector('#card-third');
  first = words[this.index];
  second = words[this.index + 1];
  third = words[this.index + 2];
  remaining = '';
  isPaused = false;
  currentTeam: string;
  indexTeam = 0;
  rounds: number;
  currentRound = 0;

  constructor(private settingsService: SettingsService, private router: Router) {

  }

  goToHome() {
    const content = document.querySelector('#content');
    const modal = document.querySelector('#modal') as unknown as Components.IonModal;
    content.classList.remove('blur');
    modal.dismiss('cancel');
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.currentRound = 0;
    this.playTime = 5;
    this.teamSize = this.settingsService.getTeamSize();
    this.teamNames = this.settingsService.getTeamNames();
    this.rounds = 1;
    this.currentTeam = this.teamNames[this.indexTeam];
    this.startTimer(this.playTime);
    this.scoresBoard = [];
    this.teamNames.forEach((team) => {
      this.scoresBoard.push(
        {
          teamName: team,
          score: 0
        }
      );
    });
    console.log(this.teamNames);
  }

  pauseTimer() {
    this.isPaused = !this.isPaused;
    const content = document.querySelector('#content');
    content.classList.add('blur');
  }

  continue() {
    this.isPaused = !this.isPaused;
    const content = document.querySelector('#content');
    const modal = document.querySelector('#modal') as unknown as Components.IonModal;
    content.classList.remove('blur');
    modal.dismiss('cancel');
  }

  startTimer(seconds: number) {
    let minute: number = (seconds / 60) | 0;
    let second: number = (seconds % 60) | 0;
    let sMinute: string = '';
    let sSecond: string = '';
    this.remaining = `${minute}:${second}`;
    var recall = setInterval(() => {
      if (!this.isPaused) {
        seconds -= 1;
        minute = (seconds / 60) | 0;
        second = (seconds % 60) | 0;
        sMinute = minute < 10 ? `0${minute}` : `${minute}`;
        sSecond = second < 10 ? `0${second}` : `${second}`;
        this.remaining = `${sMinute}:${sSecond}`;
        if (minute == 0 && second == 0) {
          this.timeOver();
          clearInterval(recall);
        }
      }
    }, 1000);
  }

  nextTeam() {
    const modal = document.querySelector('#modal-end') as unknown as IonModal;
    const content = document.querySelector('#content');
    content.classList.remove('blur');
    modal.dismiss();
    this.startTimer(this.playTime);
  }

  timeOver() {
    if (this.indexTeam + 1 == this.teamSize) {
      this.currentRound++;
      this.indexTeam = -1;
    }
    if (this.currentRound == this.rounds) {
      const content = document.querySelector('#content');
      const modal = document.querySelector("#modal-over") as unknown as IonModal;
      content.classList.add('blur');
      modal.present();
    }
    else {
      console.log(this.indexTeam);
      this.currentTeam = this.teamNames[++this.indexTeam];
      const content = document.querySelector('#content');
      const modal = document.querySelector("#modal-end") as unknown as IonModal;
      content.classList.add('blur');
      modal.present();
    }
  }

  restart() {
    const modal = document.querySelector('#modal-over') as unknown as IonModal;
    const content = document.querySelector('#content');
    content.classList.remove('blur');
    modal.dismiss();
    this.indexTeam = 0;
    this.ngOnInit();
  }

  clickTrue() {
    //score handling
    console.log(this.currentTeam);
    let object = this.scoresBoard.find(x => x.teamName == this.currentTeam);
    console.log(object);
    let index = this.scoresBoard.indexOf(object);
    object.score++;
    this.scoresBoard[index] = object;

    //card transition
    const firstCard = document.querySelector('.card-first');
    const secondCard = document.querySelector('.card-second');
    const thirdCard = document.querySelector('.card-third');
    this.index += 1;
    firstCard.classList.add('true-1')
    secondCard.classList.add('true-2');
    thirdCard.classList.add('true-3');
    setTimeout(() => {
      firstCard.classList.remove('true-1');
      secondCard.classList.remove('true-2');
      thirdCard.classList.remove('true-3');
      this.first = words[this.index];
      this.second = words[this.index + 1];
      this.third = words[this.index + 2];
    }, 400);
  }

  clickFalse() {
    //score handling
    let object = this.scoresBoard.find(x => x.teamName == this.currentTeam);
    let index = this.scoresBoard.indexOf(object);
    object.score--;
    this.scoresBoard[index] = object;

    //card transition
    const firstCard = document.querySelector('.card-first');
    const secondCard = document.querySelector('.card-second');
    const thirdCard = document.querySelector('.card-third');
    this.index += 1;
    firstCard.classList.add('false')
    secondCard.classList.add('true-2');
    thirdCard.classList.add('true-3');
    setTimeout(() => {
      firstCard.classList.remove('false');
      secondCard.classList.remove('true-2');
      thirdCard.classList.remove('true-3');
      this.first = words[this.index];
      this.second = words[this.index + 1];
      this.third = words[this.index + 2];
    }, 400);
  }

  clickPass() {
    const firstCard = document.querySelector('.card-first');
    const secondCard = document.querySelector('.card-second');
    const thirdCard = document.querySelector('.card-third');
    this.index += 1;
    firstCard.classList.add('pass')
    secondCard.classList.add('true-2');
    thirdCard.classList.add('true-3');
    setTimeout(() => {
      firstCard.classList.remove('pass');
      secondCard.classList.remove('true-2');
      thirdCard.classList.remove('true-3');
      this.first = words[this.index];
      this.second = words[this.index + 1];
      this.third = words[this.index + 2];
    }, 400);
  }

  shuffle(array: Word[]): Word[] {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

}
