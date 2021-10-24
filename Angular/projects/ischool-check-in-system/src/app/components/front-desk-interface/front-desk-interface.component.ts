import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder) {}

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
    /*this.advisors.push({firstName: "John", lastName: "Doe", portraitURL: "person2.jpg", studentQueue: [
      {studentName: "Jack Smith", username: "abc1234"}, 
      {studentName: "Jane Doe", username: "abc1234"}, 
      {studentName: "Jill Smith", username: "abc1234"}
    ]});
    this.advisors.push({firstName: "Jon", lastName: "Doe", portraitURL: "person2.jpg", studentQueue: [
      {studentName: "Jack Smith", username: "abc1234"}, 
      {studentName: "Jane Doe", username: "abc1234"}, 
      {studentName: "Jill Smith", username: "abc1234"}
    ]});
    this.advisors.push({firstName: "Jo", lastName: "Doe", portraitURL: "person2.jpg", studentQueue: [
      {studentName: "Jack Smith", username: "abc1234"}, 
      {studentName: "Jane Doe", username: "abc1234"}, 
      {studentName: "Jill Smith", username: "abc1234"}
    ]});
    this.advisors.push({firstName: "Jeff", lastName: "Doe", portraitURL: "person2.jpg", studentQueue: [
      {studentName: "Jack Smith", username: "abc1234"}, 
      {studentName: "Jane Doe", username: "abc1234"}, 
      {studentName: "Jill Smith", username: "abc1234"}
    ]});
    this.advisors.push({firstName: "Geoff", lastName: "Doe", portraitURL: "person2.jpg", studentQueue: [
      {studentName: "Jack Smith", username: "abc1234"}, 
      {studentName: "Jane Doe", username: "abc1234"}, 
      {studentName: "Jill Smith", username: "abc1234"}
    ]});
    this.advisors.push({firstName: "Geff", lastName: "Doe", portraitURL: "person2.jpg", studentQueue: [
      {studentName: "Jack Smith", username: "abc1234"}, 
      {studentName: "Jane Doe", username: "abc1234"}, 
      {studentName: "Jill Smith", username: "abc1234"}
    ]});
    this.advisors.push({firstName: "Jef", lastName: "Doe", portraitURL: "person2.jpg", studentQueue: [
      {studentName: "Jack Smith", username: "abc1234"}, 
      {studentName: "Jane Doe", username: "abc1234"}, 
      {studentName: "Jill Smith", username: "abc1234"}
    ]});
    this.advisors.push({firstName: "Jiff", lastName: "Doe", portraitURL: "person2.jpg", studentQueue: [
      {studentName: "Jack Smith", username: "abc1234"}, 
      {studentName: "Jane Doe", username: "abc1234"}, 
      {studentName: "Jill Smith", username: "abc1234"}
    ]});*/

    this.selectedAdvisor = this.advisors[0];

    this.bannerText = "This is an example of the bottom banner text. It should be large enough to be clearly legible by students looking at the interface, " + 
      "and should catch their attention without being annoying or distracting.";

    this.updateAdvisorInfoForm();
    this.updateBannerTextForm();
  }

  // signs out of the interface (will be routed back to the interface picker)
  logout() {
    console.log("logout");
    this.authService.logout();
  }

  /* -------------------- STUDENT QUEUE STUFF -------------------- */
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

  /* -------------------- ADVISOR LIST STUFF -------------------- */
  select(advisor: Advisor, i: number) {
    this.selectedAdvisor = advisor;

    /*let selectedAdvisor = document.getElementsByClassName("selectedAdvisor")[0];
    if(selectedAdvisor) {
      selectedAdvisor.classList.remove("selectedAdvisor");
    }

    let allAdvisors = document.getElementsByClassName("advisor-item-info");
    allAdvisors[i].classList.add("selectedAdvisor");*/

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

  listMoveAdvisorUp(i: number) {
    if(this.advisors[i - 1]) {
      let advisorItem = (document.getElementsByClassName("advisor-item")[i] as HTMLDivElement);
      advisorItem.style.animation = "swap-advisor-up";
      advisorItem.style.animationDuration = "0.25s";

      let aboveAdvisorItem = (document.getElementsByClassName("advisor-item")[i - 1] as HTMLDivElement);
      aboveAdvisorItem.style.animation = "swap-advisor-down";
      aboveAdvisorItem.style.animationDuration = "0.25s";

      setTimeout(() => {
        advisorItem.style.animation = "none";
        aboveAdvisorItem.style.animation = "none";

        let tempSwapAdvisor = this.advisors[i - 1];
        this.advisors[i - 1] = this.advisors[i];
        this.advisors[i] = tempSwapAdvisor;

        /*setTimeout(() => {
          if((i == 1) && document.getElementsByClassName("advisor-item")[0].firstElementChild?.classList.contains("selectedAdvisor")) {
            document.getElementsByClassName("advisor-item")[0].firstElementChild?.classList.remove("selectedAdvisor");
            document.getElementsByClassName("advisor-item")[1].firstElementChild?.classList.add("selectedAdvisor");
          }
        }, 50);*/
      }, 250);
    }
  }

  listMoveAdvisorDown(i: number) {
    if(this.advisors[i + 1]) {
      let advisorItem = (document.getElementsByClassName("advisor-item")[i] as HTMLDivElement);
      advisorItem.style.animation = "swap-advisor-down";
      advisorItem.style.animationDuration = "0.25s";

      let belowAdvisorItem = (document.getElementsByClassName("advisor-item")[i + 1] as HTMLDivElement);
      belowAdvisorItem.style.animation = "swap-advisor-up";
      belowAdvisorItem.style.animationDuration = "0.25s";

      setTimeout(() => {
        /*if(advisorItem.classList.contains("selectedAdvisor")) {
          advisorItem.classList.remove("selectedAdvisor");
          belowAdvisorItem.classList.add("selectedAdvisor");
        }
        else if(belowAdvisorItem.classList.contains("selectedAdvisor")) {
          belowAdvisorItem.classList.remove("selectedAdvisor");
          advisorItem.classList.add("selectedAdvisor");
        }*/

        advisorItem.style.animation = "none";
        belowAdvisorItem.style.animation = "none";

        let tempSwapAdvisor = this.advisors[i + 1];
        this.advisors[i + 1] = this.advisors[i];
        this.advisors[i] = tempSwapAdvisor;

        /*if((i - 1 == 0) && document.getElementsByClassName("advisor-item")[0].firstElementChild?.classList.contains("selectedAdvisor")) {
          document.getElementsByClassName("advisor-item")[0].firstElementChild?.classList.remove("selectedAdvisor");
          document.getElementsByClassName("advisor-item")[1].firstElementChild?.classList.add("selectedAdvisor");
        }*/

        /*setTimeout(() => {
          if((i + 1 == 0) && document.getElementsByClassName("advisor-item")[0].firstElementChild?.classList.contains("selectedAdvisor")) {
            document.getElementsByClassName("advisor-item")[0].firstElementChild?.classList.remove("selectedAdvisor");
            document.getElementsByClassName("advisor-item")[1].firstElementChild?.classList.add("selectedAdvisor");
          }
        }, 50);*/
      }, 250);
    }
  }

  popupDeleteAdvisor(i: number) {
    let advisorName = `${this.advisors[i].firstName} ${this.advisors[i].lastName}`;

    this.createPopup(
      "Are You Sure?", 
      `Are you sure you want to delete ${advisorName}?`, 
      [
        ["YES", `queueDeleteAdvisor(${i})`, "red"], 
        ["NO", "deletePopup()", "gray"]
      ]
    );
  }
  
  queueDeleteAdvisor(i: number) {
    if(this.advisors.length == 1) {
      this.selectedAdvisor = {
        firstName: "",
        lastName: "",
        portraitURL: "",
        studentQueue: []
      };
    }
    else if(this.advisors[i] == this.selectedAdvisor && this.advisors[i + 1]) {
      this.selectedAdvisor = this.advisors[i + 1];
    }
    else {
      this.selectedAdvisor = this.advisors[0];
    }

    this.advisors.splice(i, 1);
    this.deletePopup();
  }

  /* -------------------- BANNER INFO STUFF -------------------- */
  updateBannerTextForm() {
    this.bannerForm = this.formBuilder.group({ bannerText: this.bannerText });
  }

  saveBannerText() {

  }

  /* -------------------- POPUP STUFF -------------------- */
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
