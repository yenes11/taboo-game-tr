import { Component, OnInit } from '@angular/core';
import { Components } from '@ionic/core';
import { words } from './words';
import { Word } from './word';
import { Subscription } from 'rxjs';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  providers: [SettingsPage]
})
export class GamePage implements OnInit {
  words: Word[] = this.shuffle(words);
  subscription: Subscription;
  secs: number;

  constructor(private settings: SettingsPage) {
    this.subscription = this.settings.sendTime().subscribe(value => this.secs = value);
   }



  index = 0;

  secondCard = document.querySelector('#card-second');
  thirdCard = document.querySelector('#card-third');

  first = words[this.index];
  second = words[this.index + 1];
  third = words[this.index + 2];
  playTime = 120;
  remaining = '';
  isPaused = false;


  ngOnInit() {
    console.log(this.secs);
    this.startTimer(30);
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

  startTimer (seconds: number){
    let minute: number = (seconds / 60) | 0;
    let second: number = (seconds % 60) | 0;
    let sMinute: string = '';
    let sSecond: string = '';
    this.remaining = `${minute}:${second}`;
    var recall = setInterval(() => {
      if (!this.isPaused){
        seconds -= 1;
        minute = (seconds / 60) | 0;
        second = (seconds % 60) | 0;
        sMinute = minute < 10 ? `0${minute}` : `${minute}`;
        sSecond = second < 10 ? `0${second}` : `${second}`;
        this.remaining =`${sMinute}:${sSecond}`;
        if(minute == 0 && second == 0) {
          clearInterval(recall);
        }
      }
    }, 1000);

  }




  clickTrue() {
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
