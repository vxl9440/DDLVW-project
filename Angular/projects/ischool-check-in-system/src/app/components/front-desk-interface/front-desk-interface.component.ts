import { Component, OnInit } from '@angular/core';
import { Advisor } from '../../models/advisor';
import { Student } from '../../models/student';
import { Reason } from '../../models/reason';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-front-desk-interface',
  templateUrl: './front-desk-interface.component.html',
  styleUrls: ['./front-desk-interface.component.scss']
})
export class FrontDeskInterfaceComponent implements OnInit {
  title = 'front-desk-interface';
  advisors: Advisor[] = [];
  selectedAdvisor: Advisor = {id: -1, firstName: "", middleName: "", lastName: "", email: "", portraitURL: "", studentQueue: []};
  advisorInfoForm = this.formBuilder.group({
    fname: '',
    lname: '',
    portraitURL: ''
  });

  bannerText: string = "";
  bannerForm = this.formBuilder.group({ bannerText: '' });

  reasons: Reason[] = [];
  selectedReason: Reason = new Reason("", false);
  addingReason: boolean = false;
  reasonForm = this.formBuilder.group({
    rname: '',
    rcode: '',
    rappt: false
  });

  addAdvisorForm = this.formBuilder.group({
    fname: '',
    mname: '',
    lname: '',
    username: '',
    portraitURL: '',
  });

  addStudentForm = this.formBuilder.group({
    name: '',
    username: ''
  });

  buttonActions: string[] = ["deletePopup()", "", ""];
  popupTitle: string = "";
  popupText: string = "";
  popupButton1Text: string = "OK";
  popupButton2Text: string = "";
  popupButton3Text: string = "";

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.advisors.push({id: 0, firstName: "Elissa", middleName: '', lastName: "Weeden", email: "jnd1234@rit.edu", portraitURL: "../assets/ElissaWeeden.png", studentQueue: [
      new Student('Jack Smith', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Jane Doe', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Jill Smith', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'})
    ]});
    this.advisors.push({id: 1, firstName: "Kevin", middleName: '', lastName: "Stiner", email: "rcs4321@rit.edu", portraitURL: "../assets/KevinStiner.png", studentQueue: [
      new Student('Tim Bim', 'jms1111', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'}),
      new Student('Rebecca Grobb', 'jwd2222', '2021-09-19T19:57:55+00:00'),
      new Student('Billy Mann', 'jos3333', '2021-09-19T19:57:55+00:00', {startTime: '2021-09-19T19:57:55+00:00', endTime: '2021-09-19T19:57:55+00:00'})
    ]});
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
    this.advisors.push({id: 4, firstName: "Melissa", middleName: '', lastName: "Hanna", email: "jnd1234@rit.edu", portraitURL: "../assets/MelissaHanna.png", studentQueue: []});
    this.advisors.push({id: 5, firstName: "Kristen", middleName: '', lastName: "Shinohara", email: "gym1324@rit.edu", portraitURL: "../assets/KristenShinohara.png", studentQueue: [
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

    this.selectedAdvisor = this.advisors[0];

    this.bannerText = "This is an example of the bottom banner text. It should be large enough to be clearly legible by students looking at the interface, " + 
      "and should catch their attention without being annoying or distracting.";

    this.updateAdvisorInfoForm();
    this.updateBannerTextForm();

    this.reasons.push(new Reason("General Questions", false));
    this.reasons.push(new Reason("Reason 1", true));
    this.reasons.push(new Reason("Reason 2", false));
    this.reasons.push(new Reason("Reason 3", true));
    this.reasons.push(new Reason("Reason 4 with a really long name", false));
    this.reasons.push(new Reason("Reason5WithAReallyReallyLongName", true));
    this.reasons.push(new Reason("Reason 6", false));
    this.reasons.push(new Reason("Reason 7", true));
    this.reasons.push(new Reason("Reason 8", false));
    this.reasons.push(new Reason("Reason 9", true));
    this.reasons.push(new Reason("Reason 10", false));
    this.reasons.push(new Reason("Reason 11", true));
    this.reasons.push(new Reason("Reason 12", false));
    this.reasons.push(new Reason("Reason 13", true));
    this.reasons.push(new Reason("Reason 14 with a really long name", false));
    this.reasons.push(new Reason("Reason15WithAReallyReallyLongName", true));
    this.reasons.push(new Reason("Reason 16", false));
    this.reasons.push(new Reason("Reason 17", true));
    this.reasons.push(new Reason("Reason 18", false));
    this.reasons.push(new Reason("Reason 19", true));
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
  
  queueDeleteStudent(i: number) {
    this.selectedAdvisor.studentQueue.splice(i, 1);
    this.deletePopup();
  }

  /* -------------------- ADVISOR LIST STUFF -------------------- */
  select(advisor: Advisor, i: number) {
    this.selectedAdvisor = advisor;
    this.updateAdvisorInfoForm();
  }

  updateAdvisorInfoForm() {
    this.advisorInfoForm = this.formBuilder.group({
      fname: this.selectedAdvisor.firstName,
      lname: this.selectedAdvisor.lastName,
      portraitURL: this.selectedAdvisor.portraitURL
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
        advisorItem.style.animation = "none";
        belowAdvisorItem.style.animation = "none";

        let tempSwapAdvisor = this.advisors[i + 1];
        this.advisors[i + 1] = this.advisors[i];
        this.advisors[i] = tempSwapAdvisor;
      }, 250);
    }
  }
  
  queueDeleteAdvisor(i: number) {
    if(this.advisors.length == 1) {
      this.selectedAdvisor = {id: -1, firstName: "", middleName: "", lastName: "", email: "", portraitURL: "", studentQueue: []};
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

  /* -------------------- REASON MANAGER STUFF -------------------- */
  saveReason() {
    if(this.addingReason) {
      this.reasonSetToEditMode();
      // POST new reason to API
    }
    else {
      // PUT existing reason in API
    }
  }

  deleteReason() {
    for(let [i, reason] of this.reasons.entries()) {
      if(reason == this.selectedReason) {
        this.reasons.splice(i, 1); // DELETE existing reason in API
        this.selectedReason = new Reason("", false);
        this.updateReasonForm();
      }
    }
  }

  selectReason(i: number) {
    this.selectedReason = this.reasons[i];
    this.updateReasonForm();
  }

  updateReasonForm() {
    this.reasonForm = this.formBuilder.group({
      rname: this.selectedReason.reason,
      rappt: this.selectedReason.requiresAppt
    });
  }

  reasonSetToAddMode() {
    this.selectedReason = new Reason("", false);
    this.updateReasonForm();

    this.addingReason = true;
    document.getElementsByClassName("add-reason-subtitle")[0].classList.remove("toggled-off");
    document.getElementsByClassName("edit-reason-subtitle")[0].classList.add("toggled-off");
  }

  reasonSetToEditMode() {
    this.addingReason = false;
    document.getElementsByClassName("edit-reason-subtitle")[0].classList.remove("toggled-off");
    document.getElementsByClassName("add-reason-subtitle")[0].classList.add("toggled-off");
  }

  /* -------------------- ADD STUDENT STUFF -------------------- */
  addAdvisor() {
    // POST new advisor to API

    this.clearAddAdvisorForm();
  }

  clearAddAdvisorForm() {
    this.addAdvisorForm = this.formBuilder.group({
      fname: '',
      mname: '',
      lname: '',
      username: ''
    });
  }

  /* -------------------- ADD ADVISOR STUFF -------------------- */
  addStudent() {
    // POST new student to API

    this.clearAddStudentForm();
  }

  clearAddStudentForm() {
    this.addStudentForm = this.formBuilder.group({
      name: '',
      username: ''
    });
  }

  /* -------------------- POPUP STUFF -------------------- */
  // uses the provided info to create a popup box with up to three buttons
  createConfirmPopup(popupTitle: string, popupText: string, buttons: any) {
    (document.getElementsByClassName("popup-blur")[0] as HTMLDivElement).style.display = "flex";
    this.popupTitle = popupTitle;
    this.popupText = popupText;

    (document.getElementById("confirm") as HTMLDivElement).style.display = "flex";

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

  createReasonPopup() {
    (document.getElementsByClassName("popup-blur")[0] as HTMLDivElement).style.display = "flex";

    (document.getElementById("reason") as HTMLDivElement).style.display = "flex";
  }

  createAddStudentPopup() {
    (document.getElementsByClassName("popup-blur")[0] as HTMLDivElement).style.display = "flex";

    (document.getElementById("add-student") as HTMLDivElement).style.display = "flex";
  }

  createAddAdvisorPopup() {
    (document.getElementsByClassName("popup-blur")[0] as HTMLDivElement).style.display = "flex";

    (document.getElementById("add-advisor") as HTMLDivElement).style.display = "flex";
  }

  // removes a currently active popup box
  deletePopup() {
    this.popupTitle = "";
    this.popupText = "";
    this.addingReason = false;

    this.clearAddAdvisorForm();
    this.clearAddStudentForm();

    (document.getElementsByClassName("popup-blur")[0] as HTMLDivElement).style.display = "none";
    (document.getElementById("confirm") as HTMLDivElement).style.display = "none";
    (document.getElementById("reason") as HTMLDivElement).style.display = "none";
    (document.getElementById("add-student") as HTMLDivElement).style.display = "none";
    (document.getElementById("add-advisor") as HTMLDivElement).style.display = "none";
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
    let studentName = this.selectedAdvisor.studentQueue[i].studentName;

    this.createConfirmPopup(
      "Are You Sure?", 
      `Are you sure you want to delete ${studentName} from the queue?`, 
      [
        ["YES", `queueDeleteStudent(${i})`, "red"], 
        ["NO", "deletePopup()", "gray"]
      ]
    );
  }

  // creates a popup box for deleting an advisor from the advisor list
  popupDeleteAdvisor(i: number) {
    let advisorName = `${this.advisors[i].firstName} ${this.advisors[i].lastName}`;

    this.createConfirmPopup(
      "Are You Sure?", 
      `Are you sure you want to delete ${advisorName}?`, 
      [
        ["YES", `queueDeleteAdvisor(${i})`, "red"], 
        ["NO", "deletePopup()", "gray"]
      ]
    );
  }
}
