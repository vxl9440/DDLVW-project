// Created by Drew Bissen of Team DDLVW
// Senior Development Project II
// Last modified 11/30/2021

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Advisor } from '../../models/advisor';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-advisor-interface',
  templateUrl: './advisor-interface.component.html',
  styleUrls: ['./advisor-interface.component.scss']
})
export class AdvisorInterfaceComponent implements OnInit {
  title = 'advisor-interface';
  
  advisor: Advisor; // the current advisor
  hasSetAdvisor: boolean = false; // whether or not the advisor has been determined
  selectedStudent: any; // the currently selected student in the advisor's student queue
  meetingStudent: any; // the student currently in a meeting
  meetingStudentIndex: number; // the queue position of the student currently in a meeting
  oldStudentQueue: any; // used to check for changes in the student queue

  meetingInProgress: boolean = false; // whether or not a meeting is currently in progress
  meetingDuration: string = "00:00"; // the duration of the current meeting
  timer: any; // the meeting timer

  playSound: boolean = true; // whether or not the notification sound should be played when a change happens to the student queue

  advisorWalkInHours: any; // the advisor's walk-in hours data

  // the walk-in hours form
  walkInHoursForm = this.formBuilder.group({
    mondayStart: '',
    mondayEnd: '',
    tuesdayStart: '',
    tuesdayEnd: '',
    wednesdayStart: '',
    wednesdayEnd: '',
    thursdayStart: '',
    thursdayEnd: '',
    fridayStart: '',
    fridayEnd: ''
  });

  // used for comparing new walk-in hours data from the server with the current walk-in hours data to see if there are any changes
  oldWalkInData: any = [
    {
      startTime: "",
      endTime: "",
      weekday: 'MON'
    },
    {
      startTime: "",
      endTime: "",
      weekday: 'TUE'
    },
    {
      startTime: "",
      endTime: "",
      weekday: 'WED'
    },
    {
      startTime: "",
      endTime: "",
      weekday: 'THU'
    },
    {
      startTime: "",
      endTime: "",
      weekday: 'FRI'
    }
  ];

  // popup stuff
  buttonActions: string[] = ["deletePopup()", "", ""]; // the actions of the (up to) three buttons in the popup box
  popupTitle: string = ""; // the title of the popup box
  popupText: string = ""; // the text used in the popup box
  popupButton1Text: string = "OK"; // popup box button 1 text
  popupButton2Text: string = ""; // popup box button 2 text
  popupButton3Text: string = ""; // popup box button 3 text

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private apiService: ApiService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    // default values are set for advisor, selectedStudent, and meetingStudent
    this.advisor = {
      id: 0,
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      portraitURL: '',
      studentQueue: []
    };

    // uncomment this when done testing
    this.advisor = this.activatedRoute.snapshot.data.advisor;

    this.selectedStudent = {
      id: -1,
      studentName: "",
      username: "",
      timeIn: "",
      appointment: null,
      reasons: null
    };

    this.meetingStudent = {
      id: -1,
      studentName: "",
      username: "",
      timeIn: "",
      appointment: null,
      reasons: null
    };
  }

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

  // gets all needed data
  refreshData() {
    // GET advisor
    // for testing only
    if(!this.hasSetAdvisor) {
      // temporary - comment out when done testing
      //this.apiService.getAllAdvisors().subscribe((advisorData: Advisor[]) => {
      // uncomment when done testing
      this.activatedRoute.data.subscribe((advisorData: any) => {
        console.log('FETCHING ADVISOR: ', advisorData);

        // temporary - comment out when done testing
        //this.refreshStudentQueue(advisorData[2]);
        // uncomment when done testing
        this.refreshStudentQueue(advisorData.advisor);

        this.refreshWalkInData();

        this.playSound = true; // allows the notification sound to play if the user doesn't make changes themselves
      });
    }
    else {
      this.refreshStudentQueue(this.advisor);
    }
  }

  // refreshes the student queue
  refreshStudentQueue(chosenAdvisor: Advisor) {
    // GET student queue
    this.apiService.getAllStudentQueues().subscribe((studentData: any[]) => {
      console.log("FETCHING STUDENT QUEUES: ", studentData);
      this.oldStudentQueue = this.advisor.studentQueue;

      if(!this.hasSetAdvisor) {
        this.advisor = chosenAdvisor; // for testing only - when uncommenting code above, remove this
        this.hasSetAdvisor = true; // so the advisor never has to be set again
      }

      // only refreshes the student queue info if it has actually changed on the server
      if(JSON.stringify(studentData[this.advisor.id]) != JSON.stringify(this.oldStudentQueue)) {
        console.log("Student queue data changed on server - refreshing student queue info on interface.");

        this.advisor.studentQueue = studentData[this.advisor.id];

        // if there is no currently selected student, selects the first student in the queue (if possible)
        if(this.selectedStudent.id && this.selectedStudent.id == -1 && this.advisor.studentQueue && this.advisor.studentQueue[0]) {
          this.selectedStudent = this.advisor.studentQueue[0];
        }

        // if a change in the student queue from the server is detected, the notification sound plays
        if(this.playSound) {
          console.log("Playing notification sound.");
          let alertSound = new Audio("../../../assets/audio/mixkit-software-interface-start-2574.wav");
          alertSound.volume = 0.2;
          alertSound.play();
        }
      }
      else {
        console.log("No refresh of student queue data needed.");
      }
    });
  }

  // refreshes the walk-in hours data
  refreshWalkInData() {
    // GET walk-in hours data
    this.apiService.getAdvisorWalkInHours(this.advisor.id).subscribe((walkInData: any[]) => {
      console.log("FETCHING WALK-IN DATA: ", walkInData);

      // set current walk-in hours as oldWalkInHours for comparison later
      this.oldWalkInData = [
        {
          startTime: this.walkInHoursForm.get('mondayStart')?.value,
          endTime: this.walkInHoursForm.get('mondayEnd')?.value,
          weekday: 'MON'
        },
        {
          startTime: this.walkInHoursForm.get('tuesdayStart')?.value,
          endTime: this.walkInHoursForm.get('tuesdayEnd')?.value,
          weekday: 'TUE'
        },
        {
          startTime: this.walkInHoursForm.get('wednesdayStart')?.value,
          endTime: this.walkInHoursForm.get('wednesdayEnd')?.value,
          weekday: 'WED'
        },
        {
          startTime: this.walkInHoursForm.get('thursdayStart')?.value,
          endTime: this.walkInHoursForm.get('thursdayEnd')?.value,
          weekday: 'THU'
        },
        {
          startTime: this.walkInHoursForm.get('fridayStart')?.value,
          endTime: this.walkInHoursForm.get('fridayEnd')?.value,
          weekday: 'FRI'
        }
      ];
      
      let mondayInfo = ["", ""];
      let tuesdayInfo = ["", ""];
      let wednesdayInfo = ["", ""];
      let thursdayInfo = ["", ""];
      let fridayInfo = ["", ""];

      // assigns each day's walk-in hours data
      for(let day of walkInData) {
        switch(day.weekday) {
          case 'MON':
            mondayInfo[0] = this.checkTimeLength(day.startTime);
            mondayInfo[1] = this.checkTimeLength(day.endTime);
            break;
          case 'TUE':
            tuesdayInfo[0] = this.checkTimeLength(day.startTime);
            tuesdayInfo[1] = this.checkTimeLength(day.endTime);
            break;
          case 'WED':
            wednesdayInfo[0] = this.checkTimeLength(day.startTime);
            wednesdayInfo[1] = this.checkTimeLength(day.endTime);
            break;
          case 'THU':
            thursdayInfo[0] = this.checkTimeLength(day.startTime);
            thursdayInfo[1] = this.checkTimeLength(day.endTime);
            break;
          case 'FRI':
            fridayInfo[0] = this.checkTimeLength(day.startTime);
            fridayInfo[1] = this.checkTimeLength(day.endTime);
            break;
        }
      }

      // needed for comparing old/new walk-in hours data (the data directly from the server contains ids which we do not use)
      let noIDWalkInData = [
        {
          "startTime": mondayInfo[0],
          "endTime": mondayInfo[1],
          "weekday": "MON"
        },
        {
          "startTime": tuesdayInfo[0],
          "endTime": tuesdayInfo[1],
          "weekday": "TUE"
        },
        {
          "startTime": wednesdayInfo[0],
          "endTime": wednesdayInfo[1],
          "weekday": "WED"
        },
        {
          "startTime": thursdayInfo[0],
          "endTime": thursdayInfo[1],
          "weekday": "THU"
        },
        {
          "startTime": fridayInfo[0],
          "endTime": fridayInfo[1],
          "weekday": "FRI"
        }
      ];

      // only refreshes the walk-in hours info if it has actually changed on the server
      if(JSON.stringify(noIDWalkInData) != JSON.stringify(this.oldWalkInData)) {
        console.log("Walk-in hours data changed on server - refreshing walk-in hours info on interface.");

        this.walkInHoursForm = this.formBuilder.group({
          mondayStart: mondayInfo[0],
          mondayEnd: mondayInfo[1],
          tuesdayStart: tuesdayInfo[0],
          tuesdayEnd: tuesdayInfo[1],
          wednesdayStart: wednesdayInfo[0],
          wednesdayEnd: wednesdayInfo[1],
          thursdayStart: thursdayInfo[0],
          thursdayEnd: thursdayInfo[1],
          fridayStart: fridayInfo[0],
          fridayEnd: fridayInfo[1]
        });
      }
      else {
        console.log("No refresh of walk-in hours data needed.");
      }
    });
  }

  // signs out of the interface (will be routed back to the interface picker)
  logout() {
    if(this.meetingInProgress) {
      this.endMeeting();
    }
    
    console.log("Logging out.");
    this.authService.logout();
  }

  // gets a nicely-formatted string of the hours/minutes from a date string
  getDateTimeInfo(dateTime: string) {
    let date = new Date(dateTime);
    let minutesString = date.getMinutes().toString();
    let hours = date.getHours();
    let timeAMPM = 'AM';

    if(hours == 0) {
      hours = 12;
      timeAMPM = 'AM';
    }
    else if(hours == 12) {
      timeAMPM = 'PM';
    }
    else if(hours > 12) {
      hours = hours - 12;
      timeAMPM = 'PM';
    }

    if(minutesString.length == 1) {
      minutesString = `0${minutesString}`;
    }

    return `${hours}:${minutesString} ${timeAMPM}`;
  }

  // adds any leading zeros to time strings when necessary
  checkTimeLength(time: string) {
    if(time.length == 7) {
      return "0" + time;
    }
    else {
      return time;
    }
  }

  // deletes and replaces the walk-in hours of the current advisor on the server with the values in the walk-in hours area of the interface
  updateWalkInInfo() {
    let walkInData = [
      {
        //id: 0,
        startTime: this.walkInHoursForm.get('mondayStart')?.value,
        endTime: this.walkInHoursForm.get('mondayEnd')?.value,
        weekday: 'MON'
      },
      {
        //id: 0,
        startTime: this.walkInHoursForm.get('tuesdayStart')?.value,
        endTime: this.walkInHoursForm.get('tuesdayEnd')?.value,
        weekday: 'TUE'
      },
      {
        //id: 0,
        startTime: this.walkInHoursForm.get('wednesdayStart')?.value,
        endTime: this.walkInHoursForm.get('wednesdayEnd')?.value,
        weekday: 'WED'
      },
      {
        //id: 0,
        startTime: this.walkInHoursForm.get('thursdayStart')?.value,
        endTime: this.walkInHoursForm.get('thursdayEnd')?.value,
        weekday: 'THU'
      },
      {
        //id: 0,
        startTime: this.walkInHoursForm.get('fridayStart')?.value,
        endTime: this.walkInHoursForm.get('fridayEnd')?.value,
        weekday: 'FRI'
      }
    ];

    this.apiService.deleteAdvisorWalkInHours(this.advisor.id).subscribe(() => {
      console.log("Advisor Walk-In Hours successfully deleted.");
      this.apiService.createAdvisorWalkInHours(this.advisor.id, walkInData).subscribe(() => {
        console.log("Advisor Walk-In Hours successfully created.");
        this.refreshData();
      });
    });
  }

  // sets selected student info in the typescript and html
  setSelectedStudent(i: number) {
    this.selectedStudent = this.advisor.studentQueue[i];
  }

  // starts a meeting with the currently selected student
  startMeeting() {
    this.meetingStudent = this.selectedStudent;
    this.meetingInProgress = true;
    this.meetingStudentIndex = this.advisor.studentQueue.indexOf(this.meetingStudent);

    let timeArray = new Date().toISOString().split(".");
    let meetingStartTime = timeArray[0] + timeArray[1][timeArray[1].length - 1]; // the current time minus any fractional millisecond stuff (but still retaining the timezone identifier)

    let waitTimeReq = {
      timeIn: this.meetingStudent.timeIn,
      meetingStartTime: meetingStartTime
    }

    this.apiService.startMeeting(waitTimeReq).subscribe(() => {
      console.log("Meeting successfully started.");
      this.runMeetingTimer();
    });
  }

  // creates a popup asking if you are sure you want to end an in-progress meeting
  popupEndMeeting(i: number) {
    let studentName = this.advisor.studentQueue[i].studentName;

    this.createPopup(
      "Are You Sure?", 
      `Are you sure you want end your meeting with ${studentName}?`, 
      [
        ["YES", "endMeeting()", "red"], 
        ["NO", "deletePopup()", "gray"]
      ]
    );
  }

  // ends an in-progress meeting
  endMeeting() {
    // PUT time into analytics
    this.meetingStudent = {
      id: -1,
      studentName: "",
      username: "",
      timeIn: "",
      appointment: null,
      reasons: null
    };
    this.meetingInProgress = false;
    this.meetingDuration = "00:00";
    clearInterval(this.timer);
    this.queueDeleteStudent(this.meetingStudentIndex);
  }

  // runs a timer for the current meeting
  runMeetingTimer() {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    let secondsString = "00";
    let minutesString = "00";
    let hoursString = "0"

    this.timer = setInterval(() => {
      seconds += 1;

      if(seconds == 60) {
        seconds = 0;
        minutes += 1;

        if(minutes == 60) {
          hours += 1;
        }
      }

      hoursString = `${hours}`;

      if(minutes < 10) {
        minutesString = `0${minutes}`;
      }
      else {
        minutesString = `${minutes}`;
      }

      if(seconds < 10) {
        secondsString = `0${seconds}`;
      }
      else {
        secondsString = `${seconds}`;
      }

      if(hours > 0) {
        this.meetingDuration = `${hoursString}:${minutesString}:${secondsString}`;
      }
      else {
        this.meetingDuration = `${minutesString}:${secondsString}`;
      }
    }, 1000);
  }

  // moves a student up in the student queue (and runs animation)
  queueMoveStudentUp(i: number) {
    // student queue is refreshed before action to prevent making bad requests with server
    this.apiService.getAllStudentQueues().subscribe((studentData: any[]) => {
      console.log("FETCHING STUDENT QUEUES: ", studentData);

      this.advisor.studentQueue = studentData[this.advisor.id];

      // if there is currently no selected student, selects the first student in the queue (if possible)
      if(this.selectedStudent.id && this.selectedStudent.id == -1 && this.advisor.studentQueue && this.advisor.studentQueue[0]) {
        this.selectedStudent = this.advisor.studentQueue[0];
      }

      // is there a student above this one to swap with?
      if(this.advisor.studentQueue[i - 1]) {
        setTimeout(() => { // if this timeout is not here, the animation won't play. I have no idea why.
          // animate moving this student up
          let studentItem = (document.getElementsByClassName("student-item")[i] as HTMLDivElement);
          studentItem.style.animation = "swap-student-up";
          studentItem.style.animationDuration = "0.3s";
          studentItem.style.animationFillMode = "forwards";

          // animate moving that student down
          let aboveStudentItem = (document.getElementsByClassName("student-item")[i - 1] as HTMLDivElement);
          aboveStudentItem.style.animation = "swap-student-down";
          aboveStudentItem.style.animationDuration = "0.3s";
          aboveStudentItem.style.animationFillMode = "forwards";
        }, 0);

        // makes sure the meeting student swaps for any ongoing meetings if needed
        if(i - 1 == this.meetingStudentIndex) {
          this.meetingStudentIndex = i;
        }
        else if(i == this.meetingStudentIndex) {
          this.meetingStudentIndex = i - 1;
        }

        // wait until animation completes, then actually swap students in database
        setTimeout(() => {
          // PUT student into new queue position
          // The student position starts at 1, not 0 like the studentQueue array. 
          // Therefore, a 'newPosition' of 'i' is equivalent to studentQueue[i - 1].
          let studentMoveInfo = 
          {
            "username": this.advisor.studentQueue[i].username,
            "newPosition": i
          };

          this.apiService.moveStudentInQueue(this.advisor.id, studentMoveInfo).subscribe(() => {
            console.log("Student successfully moved up in queue.");
            this.playSound = false; // makes sure the notification sound isn't played
            // refresh data to reflect change in database
            this.refreshData();
            //this.refreshStudentQueue();
          });
        }, 300);
      }
    });
  }

  // moves a student down in the student queue (and runs animation)
  queueMoveStudentDown(i: number) {
    // student queue is refreshed before action to prevent making bad requests with server
    this.apiService.getAllStudentQueues().subscribe((studentData: any[]) => {
      console.log("FETCHING STUDENT QUEUES: ", studentData);

      this.advisor.studentQueue = studentData[this.advisor.id];

      // if there is currently no selected student, selects the first student in the queue (if possible)
      if(this.selectedStudent.id && this.selectedStudent.id == -1 && this.advisor.studentQueue && this.advisor.studentQueue[0]) {
        this.selectedStudent = this.advisor.studentQueue[0];
      }

      // is there a student below this one to swap with?
      if(this.advisor.studentQueue[i + 1]) {
        setTimeout(() => { // if this timeout is not here, the animation won't play. I have no idea why.
          // animate moving that student down
          let studentItem = (document.getElementsByClassName("student-item")[i] as HTMLDivElement);
          studentItem.style.animation = "swap-student-down";
          studentItem.style.animationDuration = "0.3s";
          studentItem.style.animationFillMode = "forwards";

          // animate moving this student up
          let belowStudentItem = (document.getElementsByClassName("student-item")[i + 1] as HTMLDivElement);
          belowStudentItem.style.animation = "swap-student-up";
          belowStudentItem.style.animationDuration = "0.3s";
          belowStudentItem.style.animationFillMode = "forwards";
        }, 0);

        // makes sure the meeting student swaps for any ongoing meetings if needed
        if(i + 1 == this.meetingStudentIndex) {
          this.meetingStudentIndex = i;
        }
        else if(i == this.meetingStudentIndex) {
          this.meetingStudentIndex = i + 1;
        }

        // wait until animation completes, then actually swap students in database
        setTimeout(() => {
          // PUT student into new queue position
          // The student position starts at 1, not 0 like the studentQueue array. 
          // Therefore, a 'newPosition' of 'i + 2' is equivalent to studentQueue[i + 1].
          let studentMoveInfo = 
          {
            "username": this.advisor.studentQueue[i].username,
            "newPosition": i + 2
          };

          this.apiService.moveStudentInQueue(this.advisor.id, studentMoveInfo).subscribe(() => {
            console.log("Student successfully moved down in queue.");
            this.playSound = false; // makes sure the notification sound isn't played
            // refresh data to reflect change in database
            this.refreshData();
          });
        }, 300);
      }
    });
  }

  // deletes a student from the student queue
  queueDeleteStudent(i: number) {
    // student queue is refreshed before action to prevent making bad requests with server
    this.apiService.getAllStudentQueues().subscribe((studentData: any[]) => {
      console.log("FETCHING STUDENT QUEUES: ", studentData);

      this.advisor.studentQueue = studentData[this.advisor.id];

      // if there is currently no selected student, selects the first student in the queue (if possible)
      if(this.selectedStudent.id && this.selectedStudent.id == -1 && this.advisor.studentQueue && this.advisor.studentQueue[0]) {
        this.selectedStudent = this.advisor.studentQueue[0];
      }

      let studentToDelete = this.advisor.studentQueue[i].username;

      // if the student being deleted is in a meeting, ends the meeting
      if(this.meetingStudent.username == studentToDelete) {
        this.meetingInProgress = false;
        this.meetingDuration = "00:00";
        this.meetingStudent = {
          id: -1,
          studentName: "",
          username: "",
          timeIn: "",
          appointment: null,
          reasons: null
        };
        clearInterval(this.timer);
      }

      // DELETE student from advisor's queue
      this.apiService.deleteStudentFromQueue(this.advisor.id, studentToDelete).subscribe(() => {
        console.log("Student successfully deleted from queue.");
        this.deletePopup();
        this.playSound = false; // makes sure the notification sound isn't played
        this.refreshData();

        if(!this.advisor.studentQueue || !this.advisor.studentQueue[0]) {
          this.selectedStudent = {
            id: -1,
            studentName: "",
            username: "",
            timeIn: "",
            appointment: null,
            reasons: null
          };
        }
        else if(studentToDelete == this.selectedStudent) {
          setTimeout(() => {
            this.setSelectedStudent(0);
          }, 50);
        }
      });
    });
  }

  /* -------------------- POPUP STUFF -------------------- */
  // uses the provided info to create a popup box with up to three buttons
  createPopup(popupTitle: string, popupText: string, buttons: any) {
    (document.getElementsByClassName("popup-background-area")[0] as HTMLDivElement).style.display = "flex";
    this.popupTitle = popupTitle;
    this.popupText = popupText;

    if(buttons[0]) {
      this.popupButton1Text = buttons[0][0];
      this.buttonActions[0] = buttons[0][1];
      document.getElementById("popup-button-1")?.classList.add(`popup-${buttons[0][2]}-button`);
    }

    if(buttons[1]) {
      this.popupButton2Text = buttons[1][0];
      this.buttonActions[1] = buttons[1][1];
      document.getElementById("popup-button-2")?.classList.add(`popup-${buttons[1][2]}-button`);
    }

    if(buttons[2]) {
      this.popupButton3Text = buttons[2][0];
      this.buttonActions[2] = buttons[2][1];
      document.getElementById("popup-button-3")?.classList.add(`popup-${buttons[2][2]}-button`);
    }
  }

  // removes a currently active popup box
  deletePopup() {
    this.popupTitle = "";
    this.popupText = "";
    (document.getElementsByClassName("popup-background-area")[0] as HTMLDivElement).style.display = "none";
  }

  // needed for the user-provided popup box button 1 action to work
  button1Action() {
    eval(`this.${this.buttonActions[0]}`);
  }

  // needed for the user-provided popup box button 2 action to work
  button2Action() {
    eval(`this.${this.buttonActions[1]}`);
  }

  // needed for the user-provided popup box button 3 action to work
  button3Action() {
    eval(`this.${this.buttonActions[2]}`);
  }

  // creates a popup box for deleting a student from the student queue
  popupDeleteStudent(i: number) {
    let studentName = this.advisor.studentQueue[i].studentName;

    this.createPopup(
      "Are You Sure?", 
      `Are you sure you want to delete ${studentName} from the queue?`, 
      [
        ["YES", `queueDeleteStudent(${i})`, "red"], 
        ["NO", "deletePopup()", "gray"]
      ]
    );
  }
}
