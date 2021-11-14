import { Component, OnInit } from '@angular/core';
import { Advisor } from '../../models/advisor';
import { Student } from '../../models/student';
import { Reason } from '../../models/reason';

import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-student-queue-interface',
  templateUrl: './student-queue-interface.component.html',
  styleUrls: ['./student-queue-interface.component.scss']
})
export class StudentQueueInterfaceComponent implements OnInit {
  title = 'student-queue-interface';
  environment: any;

  advisors: Advisor[] = [];
  maxAdvisorsToShow: number = 5; // the maximum amount of advisors to show on the screen.
  maxStudentsInList: number = 9; // the maximum amount of students to show in an advisor's student queue before ending the list with '...'
  maxStudentNameLength: number = 15; // the maximum length that a student's first name can be before it is cut off
  connected: boolean = false;
  timeUpdated: string = "?";
  //bannerText: string = "";
  /*this.bannerText = "This is an example of the bottom banner text. It should be large enough to be clearly legible by students looking at the interface, " + 
      "and should catch their attention without being annoying or distracting.";*/
  announcements: string[] = [];
  aIndex: number = 0; // the announcement index
  isSlideshowRunning: boolean = false;
  reasons: Reason[] = [];

  constructor(private apiService: ApiService) {
    this.environment = environment;
  }

  ngOnInit() {
    /*this.advisors.push({id: 0, firstName: "Elissa", middleName: '', lastName: "Weeden", email: "jnd1234@rit.edu", portraitURL: "../assets/ElissaWeeden.png", studentQueue: [
      new Student('Jack Smith', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Jane Doe', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Jill Smith', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'})
    ]});
    this.advisors.push({id: 1, firstName: "Melissa", middleName: '', lastName: "Hanna", email: "jnd1234@rit.edu", portraitURL: "../assets/MelissaHanna.png", studentQueue: []});
    this.advisors.push({id: 2, firstName: "Betty", middleName: '', lastName: "Hillman", email: "gym1324@rit.edu", portraitURL: "../assets/BettyHillman.png", studentQueue: [
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
    this.advisors.push({id: 3, firstName: "Stephen", middleName: '', lastName: "Zilora", email: "jnd1234@rit.edu", portraitURL: "../assets/StephenZilora.png", studentQueue: [
      new Student('Jack Smith', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Jane Doe', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Jill Smith', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Max Lile', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Dani Tuu', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Moe Bo', 'jwd2222', '2021-09-19T19:57:55+00:00')
    ]});
    this.advisors.push({id: 4, firstName: "Kristen", middleName: '', lastName: "Shinohara", email: "gym1324@rit.edu", portraitURL: "../assets/KristenShinohara.png", studentQueue: [
      new Student('Timgirgheroihgeoriugherogwehrogirhewohowroihgwrohrpiyhgiwiroihorwohigwoirghoiwr Bim', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
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
    this.advisors.push({id: 5, firstName: "Kevin", middleName: '', lastName: "Stiner", email: "rcs4321@rit.edu", portraitURL: "../assets/KevinStiner.png", studentQueue: [
      new Student('Tim Bim', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Rebecca Grobb', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Billy Mann', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'})
    ]});
    this.advisors.push({id: 6, firstName: "Kevin", middleName: '', lastName: "Stiner2", email: "rcs4321@rit.edu", portraitURL: "../assets/KevinStiner.png", studentQueue: [
      new Student('Tim Bim', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Rebecca Grobb', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Billy Mann', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'})
    ]});
    this.advisors.push({id: 7, firstName: "Kevin", middleName: '', lastName: "Stiner3", email: "rcs4321@rit.edu", portraitURL: "../assets/KevinStiner.png", studentQueue: [
      new Student('Tim Bim', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Rebecca Grobb', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Billy Mann', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'})
    ]});*/

    //this.announcements.push("../assets/person2.jpg");
  }

  ngAfterViewInit() {
    /*setTimeout(() => {
      if(!this.announcements || !this.announcements[0]) {
        document.getElementsByClassName("advisor-area")[0].classList.add("full-width");
        this.maxAdvisorsToShow = 7;
        console.log(this.maxAdvisorsToShow);
      }
      else {
        document.getElementsByClassName("advisor-area")[0].classList.remove("full-width");
        this.maxAdvisorsToShow = 5;
      }
    }, 50);*/
    this.connect();
  }
  
  // runs the loop that gets all required data intermittently (maybe remove later?)
  connect() {
    this.refreshData();

    setInterval(() => {
      this.refreshData();
    }, 10000);
  }

  // gets all required data from the API and deals with it appropriately
  refreshData() {
    //this.getBannerText();
    this.connected = false;
    this.apiService.getAllAdvisors().subscribe((data: Advisor[]) => {
      //console.log("getAllAdvisors: ", data);
      console.log("Advisors acquired.");

      this.connected = true;
      this.timeUpdated = this.getCurrentTimeString();
      this.advisors = data;

      this.apiService.getAllStudentQueues().subscribe((data: any[]) => {
        //console.log("getAllStudentQueues: ", data);
        console.log("Student Queues acquired.");

        let i = 0;
        while(i < this.advisors.length) {
          if(data[this.advisors[i].id]) {
            this.advisors[i].studentQueue = data[this.advisors[i].id];
          }

          //this.advisors[i].studentQueue = data[this.advisors[i].id];
          i++;
        }
      });
    });

    /*this.apiService.getBannerInfo().subscribe((data: any) => {
      this.bannerText = data.bannerInfo;
      if(this.bannerText.length > 750) {
        this.bannerText = this.bannerText.slice(0, 746);
        this.bannerText += " ...";
      }
    });*/

    this.apiService.getAnnouncements().subscribe((data: any) => {
      console.log("Announcements: ", data);
      //console.log("Announcements acquired.");

      this.announcements = data;
      if(!this.announcements || !this.announcements[0]) {
        document.getElementsByClassName("advisor-area")[0].classList.add("full-width");
        this.maxAdvisorsToShow = 7;
      }
      else {
        document.getElementsByClassName("advisor-area")[0].classList.remove("full-width");
        this.maxAdvisorsToShow = 5;
        this.runAnnouncementsSlideshow();
      }
    });
  }

  // gets the current time and returns it as a formatted string
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

  /*getBannerText() {
    if(this.bannerText.length > 750) {
      this.bannerText = this.bannerText.slice(0, 746);
      this.bannerText += " ...";
    }
  }*/

  runAnnouncementsSlideshow() {
    if(!this.isSlideshowRunning) {
      this.isSlideshowRunning = true;

      setInterval(() => {
        if(this.aIndex < this.announcements.length) {
          this.aIndex++;
        }
        else {
          this.aIndex = 0;
        }
      }, 10000);
    }
  }
}
