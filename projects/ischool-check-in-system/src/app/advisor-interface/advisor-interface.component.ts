import { Component, OnInit } from '@angular/core';

interface Student {
  studentName: string,
  username: string,
  checkInTime: string
}

interface Advisor {
  firstName: string,
  lastName: string,
  portraitURL: string,
  studentQueue: Student[]
}

@Component({
  selector: 'app-advisor-interface',
  templateUrl: './advisor-interface.component.html',
  styleUrls: ['./advisor-interface.component.scss']
})
export class AdvisorInterfaceComponent implements OnInit {
  title = 'advisor-interface';
  
  //advisorID: number = 1;
  selectedAdvisor: Advisor = {firstName: "John", lastName: "Doe", /*email: "jnd1234@rit.edu", meetsWithWalkIns: false, */portraitURL: "person2.jpg", studentQueue: [
    {studentName: "Jack Smith", username: "jms1111", checkInTime: "2021-09-19T19:57:55+00:00"}, 
    {studentName: "Jane Doe", username: "jwd2222", checkInTime: "2021-09-19T19:57:55+00:00"}, 
    {studentName: "Jill Smith", username: "jos3333", checkInTime: "2021-09-19T19:57:55+00:00"}
  ]};
  selectedStudent: Student = this.selectedAdvisor.studentQueue[0];

  selectedStudentApptStartTime: string = "";
  selectedStudentApptEndTime: string = "";
  selectedStudentWalkIn: boolean = true;

  meetingInProgress: boolean = false;

  buttonActions: string[] = ["deletePopup()", "", ""];
  popupTitle: string = "";
  popupText: string = "";
  popupButton1Text: string = "OK";
  popupButton2Text: string = "";
  popupButton3Text: string = "";

  ngOnInit() {}

  ngAfterViewInit() {
    (document.getElementsByClassName("student-item-bar")[0] as HTMLDivElement).classList.add("selected-student");
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

    this.selectedAdvisor.studentQueue.splice(i, 1);
    this.deletePopup();
    setTimeout(() => {
      this.setSelectedStudent(0);
    }, 50);
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
