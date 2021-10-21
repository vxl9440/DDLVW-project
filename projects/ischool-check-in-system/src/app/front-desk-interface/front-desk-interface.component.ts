import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

interface Student {
  studentName: string,
  username: string
}

interface Advisor {
  firstName: string,
  lastName: string,
  portraitURL: string,
  studentQueue: Student[]
}

@Component({
  selector: 'app-front-desk-interface',
  templateUrl: './front-desk-interface.component.html',
  styleUrls: ['./front-desk-interface.component.scss']
})
export class FrontDeskInterfaceComponent implements OnInit {
  title = 'front-desk-interface';
  advisors: Advisor[] = [];
  selectedAdvisor: Advisor = {firstName: "", lastName: "", /*email: "", meetsWithWalkIns: false, */portraitURL: "", studentQueue: []};

  advisorInfoForm = this.formBuilder.group({
    fname: '',
    lname: '',
    //email: '',
    //portraitURL: '',
    //meetsWithWalkIns: ''
  });

  bannerText: string = "";
  bannerForm = this.formBuilder.group({ bannerText: '' });

  imgPathStart: string = "../assets/";

  buttonActions: string[] = ["deletePopup()", "", ""];
  popupTitle: string = "";
  popupText: string = "";
  popupButton1Text: string = "OK";
  popupButton2Text: string = "";
  popupButton3Text: string = "";

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.advisors.push({firstName: "John", lastName: "Doe", /*email: "jnd1234@rit.edu", meetsWithWalkIns: false, */portraitURL: "person2.jpg", studentQueue: [
      {studentName: "Jack Smith", username: "abc1234"}, 
      {studentName: "Jane Doe", username: "abc1234"}, 
      {studentName: "Jill Smith", username: "abc1234"}
    ]});
    this.advisors.push({firstName: "Rachel", lastName: "Smachel", /*email: "rcs4321@rit.edu", meetsWithWalkIns: true, */portraitURL: "person4.jpg", studentQueue: [
      {studentName: "Tim Bim", username: "abc1234"}, 
      {studentName: "Rebecca Grobb", username: "abc1234"}, 
      {studentName: "Billy Mann", username: "abc1234"}
    ]});
    this.advisors.push({firstName: "George", lastName: "Guywithaveryveryverylongname", /*email: "gym1324@rit.edu", meetsWithWalkIns: true, */portraitURL: "person1.jpg", studentQueue: [
      {studentName: "Tim Bim", username: "abc1234"}, 
      {studentName: "Rebecca Grobb", username: "abc1234"}, 
      {studentName: "Billy Mann", username: "abc1234"}, 
      {studentName: "Mikah Guell", username: "abc1234"},  
      {studentName: "Diesel Feesel", username: "abc1234"}, 
      {studentName: "Dani Sel", username: "abc1234"}, 
      {studentName: "Larry Grobb", username: "abc1234"}, 
      {studentName: "Shima Plok", username: "abc1234"}, 
      {studentName: "Gus Juss", username: "abc1234"}, 
      {studentName: "Tim Bim", username: "abc1234"}, 
      {studentName: "Rebecca Grobb", username: "abc1234"}, 
      {studentName: "Billy Mann", username: "abc1234"}, 
      {studentName: "Mikah Guell", username: "abc1234"}, 
      {studentName: "Diesel Feesel", username: "abc1234"}, 
      {studentName: "Dani Sel", username: "abc1234"}, 
      {studentName: "Larry Grobb", username: "abc1234"}, 
      {studentName: "Shima Plok", username: "abc1234"}, 
      {studentName: "Gus Juss", username: "abc1234"}
    ]});
    this.advisors.push({firstName: "Sabrina", lastName: "Quazz", /*email: "stq2413@rit.edu", meetsWithWalkIns: false, */portraitURL: "person3.jpg", studentQueue: []});

    this.selectedAdvisor = this.advisors[0];

    this.bannerText = "This is an example of the bottom banner text. It should be large enough to be clearly legible by students looking at the interface, " + 
      "and should catch their attention without being annoying or distracting.";

    this.updateAdvisorInfoForm();
    this.updateBannerTextForm();
  }

  select(advisor: Advisor, i: number) {
    this.selectedAdvisor = advisor;

    let selectedAdvisor = document.getElementsByClassName("selectedAdvisor")[0];
    if(selectedAdvisor) {
      selectedAdvisor.classList.remove("selectedAdvisor");
    }

    let allAdvisors = document.getElementsByClassName("advisor-item");
    allAdvisors[i].classList.add("selectedAdvisor");

    this.updateAdvisorInfoForm();
  }

  updateAdvisorInfoForm() {
    this.advisorInfoForm = this.formBuilder.group({
      fname: this.selectedAdvisor.firstName,
      lname: this.selectedAdvisor.lastName,
      //email: this.selectedAdvisor.email,
      //portraitURL: '',
      //meetsWithWalkIns: this.selectedAdvisor.meetsWithWalkIns
    });
  }

  saveAdvisorInfo() {

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
    this.selectedAdvisor.studentQueue.splice(i, 1);
    this.deletePopup();
  }

  updateBannerTextForm() {
    this.bannerForm = this.formBuilder.group({ bannerText: this.bannerText });
  }

  saveBannerText() {

  }

  createPopup(popupTitle: string, popupText: string, buttons: any) {
    (document.getElementsByClassName("popup-blur")[0] as HTMLDivElement).style.display = "flex";
    this.popupTitle = popupTitle;
    this.popupText = popupText;

    //let buttonArea = (document.getElementsByClassName("popup-buttons-area")[0] as HTMLDivElement);
    //console.log("buttonArea:", buttonArea);

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

    /*for(let button of buttons) {
      //let buttonElement = document.createElement("button");
      //buttonElement.classList.add("popup-button", `popup-${button[2]}-button`);
      //buttonElement.textContent = button[0];
      //buttonElement.addEventListener("click", function() { eval(button[1]); });
      //buttonArea.appendChild(buttonElement);
      buttonArea.innerHTML += "<button class='popup-button popup-" + button[2] + "-button' (click)='" + button[1] + "'>" + button[0] + "</button>";
    }*/
  }

  deletePopup() {
    this.popupTitle = "";
    this.popupText = "";
    (document.getElementsByClassName("popup-blur")[0] as HTMLDivElement).style.display = "none";
    //this.isBackgroundBlurred = false;
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
