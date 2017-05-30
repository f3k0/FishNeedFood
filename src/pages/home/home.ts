import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public alerCtrl: AlertController) { }

  doFeedingTime() {
      let alert = this.alerCtrl.create({
        title: 'Feeding time',
        message: 'In ' + this.calculateFeedingTime() + '!',
        buttons: ['Got it']
      });
      alert.present()
    }
  
  calculateFeedingTime() {

      var now = new Date();
      var amFeedingTime = this.addMinutes(new Date(now.getFullYear(), now.getMonth(), now.getDate()), (30*12)+30); // +6h30m = 06:30
      var pmFeedingTime = this.addMinutes(new Date(now.getFullYear(), now.getMonth(), now.getDate()), (30*38)+30); // +19h30m = 19:30
      var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      var feedingTimeInMinutes = 0;

      tomorrow = this.addMinutes(tomorrow,  (30*12)+30); // am feeding time tomorrow
   
      // early morning
      if(now.getTime() <= amFeedingTime.getTime() ) {
        feedingTimeInMinutes = Math.round((amFeedingTime.getTime() - now.getTime()) / 1000) / 3600;
      }

      // afternoon
      if(now.getTime() >= amFeedingTime.getTime() && now.getTime() < pmFeedingTime.getTime()) {
        feedingTimeInMinutes = Math.round((pmFeedingTime.getTime() - now.getTime()) / 1000) / 3600;
      }

      // calculate for next day
      if(now.getTime() > pmFeedingTime.getTime()) {
        feedingTimeInMinutes = Math.round((tomorrow.getTime() - now.getTime()) / 1000) / 3600; 
      }
        
      return  this.getFeedingTime(feedingTimeInMinutes);
  }

  // add time to date
  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
  }

  getFeedingTime(timeInMinutes) {
  return  Math.floor(timeInMinutes) + ' hours ' + Math.ceil(((timeInMinutes - Math.floor(timeInMinutes)) * 3600 / 60)) + ' minutes'; 
  }

}
