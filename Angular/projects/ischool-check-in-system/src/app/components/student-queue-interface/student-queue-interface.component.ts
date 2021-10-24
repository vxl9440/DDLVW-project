import { Component, OnInit } from '@angular/core';
import { Advisor } from '../../models/advisor';
import { Student } from '../../models/student';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/*interface Student {
  firstName: String,
  lastName: String,
  img: String
}*/

/*interface Advisor {
  firstName: String,
  lastName: String,
  username: String,
  portraitURL: String,
  studentQueue: Student[]
}*/

@Component({
  selector: 'app-student-queue-interface',
  templateUrl: './student-queue-interface.component.html',
  styleUrls: ['./student-queue-interface.component.scss']
})
export class StudentQueueInterfaceComponent implements OnInit {
  title = 'student-queue-interface';
  advisors: Advisor[] = [];
  maxStudentsInList: number = 14;
  connected: boolean = false;
  timeUpdated: string = "?";
  bannerText: string = "";

  constructor(private http: HttpClient) {
    
  }

  ngOnInit() {
    this.advisors.push({id: 0, firstName: "Elissa", middleName: '', lastName: "Weeden", username: "jnd1234", portraitURL: "../assets/ElissaWeeden.png", studentQueue: [
      new Student('Jack Smith', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Jane Doe', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Jill Smith', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'})
    ]});
    this.advisors.push({id: 1, firstName: "Kevin", middleName: '', lastName: "Stiner", username: "rcs4321", portraitURL: "../assets/KevinStiner.png", studentQueue: [
      new Student('Tim Bim', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Rebecca Grobb', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Billy Mann', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'})
    ]});
    this.advisors.push({id: 2, firstName: "Betty", middleName: '', lastName: "Hillman", username: "gym1324", portraitURL: "../assets/BettyHillman.png", studentQueue: [
      new Student('Tim Bim', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Rebecca Grobb', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Billy Mann', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Mikah Guell', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Diesel Feesel', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Dani Sel', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Larry Grobb', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Shima Plok', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Gus Juss', 'jwd2222', '2021-09-19T19:57:55+00:00')
    ]});
    this.advisors.push({id: 3, firstName: "Stephen", middleName: '', lastName: "Zilora", username: "jnd1234", portraitURL: "../assets/StephenZilora.png", studentQueue: [
      new Student('Jack Smith', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Jane Doe', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Jill Smith', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Max Lile', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Dani Tuu', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Moe Bo', 'jwd2222', '2021-09-19T19:57:55+00:00')
    ]});
    this.advisors.push({id: 4, firstName: "Melissa", middleName: '', lastName: "Hanna", username: "jnd1234", portraitURL: "../assets/MelissaHanna.png", studentQueue: []});
    this.advisors.push({id: 5, firstName: "Kristen", middleName: '', lastName: "Shinohara", username: "gym1324", portraitURL: "../assets/KristenShinohara.png", studentQueue: [
      new Student('Tim Bim', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Rebecca Grobb', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Billy Mann', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Mikah Guell', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Diesel Feesel', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Dani Sel', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Larry Grobb', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Shima Plok', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Gus Juss', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Tim Bim', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Rebecca Grobb', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Billy Mann', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Mikah Guell', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Diesel Feesel', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Dani Sel', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Larry Grobb', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Shima Plok', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Gus Juss', 'jwd2222', '2021-09-19T19:57:55+00:00')
    ]});

    this.connect();
  }
  
  connect() {
    //temp (for testing purposes)
    setTimeout(() => { 
      this.connected = true;
      this.getInfo();
    }, 3000);
  }

  getInfo() {
    if(this.connected) {
      this.timeUpdated = this.getCurrentTimeString();
      this.getBannerText();
    }
  }

  getCurrentTimeString() {
    let currDay = new Date();
    let timeAMPM = "AM";
    let hours = currDay.getHours();
    let minutes = currDay.getMinutes();

    if(hours == 0) {
      timeAMPM = "AM";
      hours = 12;
    }
    else if(hours == 12) {
      timeAMPM = "PM";
    }
    else if(hours > 12) {
      timeAMPM = "PM";
      hours -= 12;
    }

    if(minutes < 10) {
      return `${hours}:0${minutes} ${timeAMPM}`;
    }
    else {
      return `${hours}:${minutes} ${timeAMPM}`;
    }
  }

  getBannerText() {
    /*this.bannerText = "This is an example of the bottom banner text. It should be large enough to be clearly legible by students looking at the interface, " + 
      "and should catch their attention without being annoying or distracting. This is an example of the bottom banner text. It should be large enough to be " + 
      "clearly legible by students looking at the interface, and should catch their attention without being annoying or distracting. This is an example of the " + 
      "bottom banner text. It should be large enough to be clearly legible by students looking at the interface, and should catch their attention without being " + 
      "annoying or distracting. This is an example of the bottom banner text. It should be large enough to be clearly legible by students looking at the interface, " + 
      "and should catch their attention without being annoying or distracting.";*/
    this.bannerText = "This is an example of the bottom banner text. It should be large enough to be clearly legible by students looking at the interface, " + 
      "and should catch their attention without being annoying or distracting.";
    //this.bannerText = "";

    if(this.bannerText.length > 750) {
      this.bannerText = this.bannerText.slice(0, 746);
      this.bannerText += " ...";
    }
  }
}
