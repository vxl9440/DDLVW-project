import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
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
  advisor: Advisor;

  selectedAdvisor: Advisor = {
    firstName: "John", lastName: "Doe", portraitURL: "person2.jpg", studentQueue: [
      new Student('Jack Smith', 'jms1111', '2021-09-19T19:57:55+00:00'),
      new Student('Jane Doe', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Jill Smith', 'jos3333', '2021-09-19T19:57:55+00:00')
    ],
    id: 0,
    middleName: '',
    username: ''
  };
  selectedStudent: Student = this.selectedAdvisor.studentQueue[0];
  meetingStudent: Student;

  selectedStudentApptStartTime: string = "";
  selectedStudentApptEndTime: string = "";
  selectedStudentWalkIn: boolean = true;

  meetingInProgress: boolean = false;

  advisorWalkInHours = [{
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

  buttonActions: string[] = ["deletePopup()", "", ""];
  popupTitle: string = "";
  popupText: string = "";
  popupButton1Text: string = "OK";
  popupButton2Text: string = "";
  popupButton3Text: string = "";

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((response: any) => {
      console.log('FETCHING ADVISOR ', response);
      this.advisor = response.advisor;
    });

    this.setWalkInInfo();
  }

  ngAfterViewInit() {
    (document.getElementsByClassName("student-item-bar")[0] as HTMLDivElement).classList.add("selected-student");
  }

  logout() {
    this.endMeeting();
    console.log("logout");
    this.authService.logout();
  }

  checkTimeLength(time: string) {
    if(time.length == 7) {
      return "0" + time;
    }
    else {
      return time;
    }
  }

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

  setSelectedStudent(i: number) {
    if((document.getElementsByClassName("selected-student")[0] as HTMLDivElement)) {
      (document.getElementsByClassName("selected-student")[0] as HTMLDivElement).classList.remove("selected-student");
    }
    this.selectedStudent = this.selectedAdvisor.studentQueue[i];
    (document.getElementsByClassName("student-item-bar")[i] as HTMLDivElement).classList.add("selected-student");
  }

  startMeeting() {
    this.meetingStudent = this.selectedStudent;
    this.meetingInProgress = true;
  }

  endMeeting() {
    this.meetingStudent = new Student('', '', '');
    this.meetingInProgress = false;
  }

  queueMoveStudentUp(i: number) {
    if(this.selectedAdvisor.studentQueue[i - 1]) {
      let studentItem = (document.getElementsByClassName("student-item")[i] as HTMLDivElement);
      studentItem.style.animation = "swap-student-up";
      studentItem.style.animationDuration = "0.25s";

      let aboveStudentItem = (document.getElementsByClassName("student-item")[i - 1] as HTMLDivElement);
      aboveStudentItem.style.animation = "swap-student-down";
      aboveStudentItem.style.animationDuration = "0.25s";

      setTimeout(() => {
        studentItem.style.animation = "none";
        aboveStudentItem.style.animation = "none";

        let tempSwapStudent = this.selectedAdvisor.studentQueue[i - 1];
        this.selectedAdvisor.studentQueue[i - 1] = this.selectedAdvisor.studentQueue[i];
        this.selectedAdvisor.studentQueue[i] = tempSwapStudent;
      }, 250);
    }
  }

  queueMoveStudentDown(i: number) {
    if(this.selectedAdvisor.studentQueue[i + 1]) {
      let studentItem = (document.getElementsByClassName("student-item")[i] as HTMLDivElement);
      studentItem.style.animation = "swap-student-down";
      studentItem.style.animationDuration = "0.25s";

      let belowStudentItem = (document.getElementsByClassName("student-item")[i + 1] as HTMLDivElement);
      belowStudentItem.style.animation = "swap-student-up";
      belowStudentItem.style.animationDuration = "0.25s";

      setTimeout(() => {
        studentItem.style.animation = "none";
        belowStudentItem.style.animation = "none";

        let tempSwapStudent = this.selectedAdvisor.studentQueue[i + 1];
        this.selectedAdvisor.studentQueue[i + 1] = this.selectedAdvisor.studentQueue[i];
        this.selectedAdvisor.studentQueue[i] = tempSwapStudent;
      }, 250);
    }
  }

  /* -------------------- POPUP STUFF -------------------- */
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

  deletePopup() {
    this.popupTitle = "";
    this.popupText = "";
    (document.getElementsByClassName("popup-blur")[0] as HTMLDivElement).style.display = "none";
  }

  popupDeleteStudent(i: number) {
    let studentName = this.selectedAdvisor.studentQueue[i].studentName;

    this.createPopup(
      "Are You Sure?", 
      `Are you sure you want to delete ${studentName} from the queue?`, 
      [
        ["YES", `queueDeleteStudent(${i})`, "red"], 
        ["NO", "deletePopup()", "gray"]
      ]
    );
  }
  
  queueDeleteStudent(i: number) {
    /*const deletedStudent = new Promise((resolve, reject) => {
      if(this.selectedAdvisor.studentQueue.splice(i, 1)) {
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

    let studentToDelete = this.selectedAdvisor.studentQueue[i];

    if(this.meetingStudent = studentToDelete) {
      this.meetingInProgress = false;
      this.meetingStudent = new Student('', '', '');
    }

    this.selectedAdvisor.studentQueue.splice(i, 1);
    this.deletePopup();

    if(!this.selectedAdvisor.studentQueue[0]) {
      this.selectedStudent = new Student('', '', '');
    }
    else if(studentToDelete == this.selectedStudent) {
      setTimeout(() => {
        this.setSelectedStudent(0);
      }, 50);
    }
  }

  button1Action() {
    eval(`this.${this.buttonActions[0]}`);
  }

  button2Action() {
    eval(`this.${this.buttonActions[1]}`);
  }

  button3Action() {
    eval(`this.${this.buttonActions[2]}`);
  }
}
