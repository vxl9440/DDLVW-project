// Created by Drew Bissen of Team DDLVW
// Senior Development Project II
// Last modified 11/30/2021

import { Component, OnInit } from '@angular/core';
import { Advisor } from '../../models/advisor';

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
  enabledAdvisors: Advisor[] = []; // contains only the enabled advisors (only advisors in this array will show on the interface).
  maxAdvisorsToShow: number = 5; // the maximum amount of advisors to show on the screen.
  maxStudentsInList: number = 9; // the maximum amount of students to show in an advisor's student queue before ending the list with '...'
  maxStudentNameLength: number = 15; // the maximum length that a student's first name can be before it is cut off
  connected: boolean = false; // whether or not we are connected to the server
  timeUpdated: string = "?"; // the time the data from the server was last updated
  announcements: string[] = [];
  aIndex: number = 0; // the announcement index
  isSlideshowRunning: boolean = false; // whether or not the announcement slideshow is currently running

  constructor(private apiService: ApiService) {
    this.environment = environment;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.connect();
  }
  
  // runs the loop that gets all required data intermittently
  connect() {
    this.refreshData();

    setInterval(() => {
      this.refreshData();
    }, 10000);
  }

  // gets all required data from the API and deals with it appropriately
  refreshData() {
    this.connected = false;
    // GET advisors
    this.apiService.getAllAdvisors().subscribe((advisorData: Advisor[]) => {
      console.log("Advisors acquired.");

      this.connected = true;
      this.timeUpdated = this.getCurrentTimeString();

      // GET student queues
      this.apiService.getAllStudentQueues().subscribe((studentData: any[]) => {
        console.log("Student Queues acquired.");

        this.advisors = advisorData;

        // assigns student queues to their corresponding advisors
        let i = 0;
        while(i < this.advisors.length) {
          if(studentData[this.advisors[i].id]) {
            this.advisors[i].studentQueue = studentData[this.advisors[i].id];
          }

          i++;
        }

        // creates and populates the enabled advisors array
        this.enabledAdvisors = [];
        for(let advisor of this.advisors) {
          if(advisor.enabled) {
            this.enabledAdvisors.push(advisor);
          }
        }
      });
    });

    // GET announcements
    this.apiService.getAnnouncements().subscribe((announcementData: any) => {
      console.log("Announcements acquired.");

      this.announcements = announcementData;
      if(!this.announcements || !this.announcements[0]) {
        // removes the announcements part of the interface if there are no announcements to show
        document.getElementsByClassName("advisor-area")[0].classList.add("full-width");
        this.maxAdvisorsToShow = 7; // 7 advisors can comfortably fit when not showing announcements
      }
      else {
        // adds the announcements part of the interface if there are announcements to show
        document.getElementsByClassName("advisor-area")[0].classList.remove("full-width");
        this.maxAdvisorsToShow = 5; // only 5 advisors can comfortably fit when also showing announcements
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

  // runs the announcement slideshow which cycles through all announcement images (10s per image)
  runAnnouncementsSlideshow() {
    // only tries running the slideshow if it's not already running
    if(!this.isSlideshowRunning) {
      this.isSlideshowRunning = true;

      setInterval(() => {
        if(this.aIndex < this.announcements.length) {
          this.aIndex++;
          if(this.aIndex == this.announcements.length) {
            this.aIndex = 0;
          }
        }
      }, 10000);
    }
  }
}
