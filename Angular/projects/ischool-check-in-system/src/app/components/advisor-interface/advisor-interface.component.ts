import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Advisor } from '../../models/advisor';
import { Student } from '../../models/student';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-advisor-interface',
  templateUrl: './advisor-interface.component.html',
  styleUrls: ['./advisor-interface.component.scss']
})
export class AdvisorInterfaceComponent implements OnInit {
  title = 'advisor-interface';
  
  //advisorID: number = 1;
  advisor: Advisor; // the current advisor
  selectedStudent: Student; // the currently selected student in the advisor's student queue
  meetingStudent: Student; // the student currently in a meeting
  meetingStudentIndex: number; // the queue position of the student currently in a meeting

  meetingInProgress: boolean = false; // whether or not a meeting is currently in progress
  meetingDuration: string = "00:00"; // the duration of the current meeting
  timer: any; // the meeting timer

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

  // popup stuff
  buttonActions: string[] = ["deletePopup()", "", ""]; // the actions of the (up to) three buttons in the popup box
  popupTitle: string = ""; // the title of the popup box
  popupText: string = ""; // the text used in the popup box
  popupButton1Text: string = "OK"; // popup box button 1 text
  popupButton2Text: string = ""; // popup box button 2 text
  popupButton3Text: string = ""; // popup box button 3 text

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((response: any) => {
      console.log('FETCHING ADVISOR ', response);
      this.advisor = response.advisor;
    });

    this.getInfo();
  }

  ngAfterViewInit() {
    (document.getElementsByClassName("student-item-bar")[0] as HTMLDivElement).classList.add("selected-student");
  }

  // gets all needed data
  getInfo() {
    this.advisor = {
      id: 0,
      firstName: "John", 
      middleName: '',
      lastName: "Doe", 
      username: '',
      portraitURL: "../assets/person2.jpg", 
      studentQueue: [
        new Student('Jack Smith', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
        new Student('Jane Doe', 'jwd2222', '2021-09-19T19:57:55+00:00'),
        new Student('Jill Smith', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'})
      ]
    };
    this.selectedStudent = this.advisor.studentQueue[0];
    
    // get/set walk-in hours info
    this.advisorWalkInHours = this.getWalkInHoursInfo(this.advisor.id);
    this.setWalkInInfo();
  }

  // gets the advisor's walk-in hours info
  getWalkInHoursInfo(id: number) {
    // GET /meetingHost/{id}/walkInHours
    return [{
        startTime: "13:00:00",
        endTime: "14:30:00",
        weekday: "Mon"
      }, {
        startTime: "11:00:00",
        endTime: "14:00:00",
        weekday: "Tue"
      }, {
        startTime: "13:00:00",
        endTime: "14:30:00",
        weekday: "Wed"
      }, {
        startTime: "9:00:00",
        endTime: "12:00:00",
        weekday: "Thu"
      }, {
        startTime: "13:00:00",
        endTime: "14:30:00",
        weekday: "Fri"
      }
    ];
  }

  // signs out of the interface (will be routed back to the interface picker)
  logout() {
    if(this.meetingInProgress) {
      this.endMeeting();
    }
    
    console.log("logout");
    this.authService.logout();
  }

  // gets a nicely-formatted string of the hours/minutes from a date string
  getDateTimeInfo(dateTime: string) {
    let date = new Date(dateTime);
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

    return `${hours}:${date.getMinutes()} ${timeAMPM}`;
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

  // sets walk-in hours info in the walk-in hours form using the advisorWalkInHours data
  setWalkInInfo() {
    let mondayInfo = ["", ""];
    let tuesdayInfo = ["", ""];
    let wednesdayInfo = ["", ""];
    let thursdayInfo = ["", ""];
    let fridayInfo = ["", ""];

    for(let day of this.advisorWalkInHours) {
      switch(day.weekday) {
        case "Mon":
          mondayInfo[0] = this.checkTimeLength(day.startTime);
          mondayInfo[1] = this.checkTimeLength(day.endTime);
          break;
        case "Tue":
          tuesdayInfo[0] = this.checkTimeLength(day.startTime);
          tuesdayInfo[1] = this.checkTimeLength(day.endTime);
          break;
        case "Wed":
          wednesdayInfo[0] = this.checkTimeLength(day.startTime);
          wednesdayInfo[1] = this.checkTimeLength(day.endTime);
          break;
        case "Thu":
          thursdayInfo[0] = this.checkTimeLength(day.startTime);
          thursdayInfo[1] = this.checkTimeLength(day.endTime);
          break;
        case "Fri":
          fridayInfo[0] = this.checkTimeLength(day.startTime);
          fridayInfo[1] = this.checkTimeLength(day.endTime);
          break;
      }
    }

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

  updateWalkInInfo() {
    
  }

  // sets selected student info in the typescript and html
  setSelectedStudent(i: number) {
    if((document.getElementsByClassName("selected-student")[0] as HTMLDivElement)) {
      (document.getElementsByClassName("selected-student")[0] as HTMLDivElement).classList.remove("selected-student");
    }
    this.selectedStudent = this.advisor.studentQueue[i];
    (document.getElementsByClassName("student-item-bar")[i] as HTMLDivElement).classList.add("selected-student");
  }

  // starts a meeting with the currently selected student
  startMeeting() {
    this.meetingStudent = this.selectedStudent;
    this.meetingInProgress = true;
    this.meetingStudentIndex = this.advisor.studentQueue.indexOf(this.meetingStudent);

    this.runMeetingTimer();
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
    this.meetingStudent = new Student('', '', '');
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

  /*showEndMeetingText() {
    (document.getElementsByClassName('meeting-button red-button')[0] as HTMLButtonElement).innerText = "End Meeting";
  }

  stopShowingEndMeetingText() {
    (document.getElementsByClassName('meeting-button red-button')[0] as HTMLButtonElement).innerText = this.meetingDuration;
  }*/

  // moves a student up in the student queue (and runs animation)
  queueMoveStudentUp(i: number) {
    if(this.advisor.studentQueue[i - 1]) {
      let studentItem = (document.getElementsByClassName("student-item")[i] as HTMLDivElement);
      studentItem.style.animation = "swap-student-up";
      studentItem.style.animationDuration = "0.25s";

      let aboveStudentItem = (document.getElementsByClassName("student-item")[i - 1] as HTMLDivElement);
      aboveStudentItem.style.animation = "swap-student-down";
      aboveStudentItem.style.animationDuration = "0.25s";

      setTimeout(() => {
        studentItem.style.animation = "none";
        aboveStudentItem.style.animation = "none";

        let tempSwapStudent = this.advisor.studentQueue[i - 1];
        this.advisor.studentQueue[i - 1] = this.advisor.studentQueue[i];
        this.advisor.studentQueue[i] = tempSwapStudent;
      }, 250);
    }
  }

  // moves a student down in the student queue (and runs animation)
  queueMoveStudentDown(i: number) {
    if(this.advisor.studentQueue[i + 1]) {
      let studentItem = (document.getElementsByClassName("student-item")[i] as HTMLDivElement);
      studentItem.style.animation = "swap-student-down";
      studentItem.style.animationDuration = "0.25s";

      let belowStudentItem = (document.getElementsByClassName("student-item")[i + 1] as HTMLDivElement);
      belowStudentItem.style.animation = "swap-student-up";
      belowStudentItem.style.animationDuration = "0.25s";

      setTimeout(() => {
        studentItem.style.animation = "none";
        belowStudentItem.style.animation = "none";

        let tempSwapStudent = this.advisor.studentQueue[i + 1];
        this.advisor.studentQueue[i + 1] = this.advisor.studentQueue[i];
        this.advisor.studentQueue[i] = tempSwapStudent;
      }, 250);
    }
  }

  /* -------------------- POPUP STUFF -------------------- */
  // uses the provided info to create a popup box with up to three buttons
  createPopup(popupTitle: string, popupText: string, buttons: any) {
    (document.getElementsByClassName("popup-blur")[0] as HTMLDivElement).style.display = "flex";
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
    (document.getElementsByClassName("popup-blur")[0] as HTMLDivElement).style.display = "none";
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
  
  // deletes a student from the student queue
  queueDeleteStudent(i: number) {
    /*const deletedStudent = new Promise((resolve, reject) => {
      if(this.advisor.studentQueue.splice(i, 1)) {
        resolve("Student deleted.");
      }
      else {
        reject("Student not deleted.");
      }
    });

    this.deletePopup();

    deletedStudent.then(value => {
      console.log(value);
      this.setSelectedStudent(0);
    });*/

    let studentToDelete = this.advisor.studentQueue[i];

    if(this.meetingStudent = studentToDelete) {
      this.meetingInProgress = false;
      this.meetingDuration = "00:00";
      this.meetingStudent = new Student('', '', '');
      clearInterval(this.timer);
    }

    this.advisor.studentQueue.splice(i, 1);
    this.deletePopup();

    if(!this.advisor.studentQueue[0]) {
      this.selectedStudent = new Student('', '', '');
    }
    else if(studentToDelete == this.selectedStudent) {
      setTimeout(() => {
        this.setSelectedStudent(0);
      }, 50);
    }
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
}
