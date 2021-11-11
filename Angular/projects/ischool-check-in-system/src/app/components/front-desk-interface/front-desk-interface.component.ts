import { Component, OnInit } from '@angular/core';
import { Advisor } from '../../models/advisor';
import { Student } from '../../models/student';
import { Reason } from '../../models/reason';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';

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
    mname: '',
    lname: '',
    email: '',
    portraitURL: ''
  });

  bannerText: string = "";
  bannerForm = this.formBuilder.group({ bannerText: '' });

  reasons: Reason[] = [];
  selectedReason: Reason = new Reason(-1, "", false);
  addingReason: boolean = true;
  reasonForm = this.formBuilder.group({
    rname: '',
    rcode: '',
    rappt: false
  });

  addAdvisorForm = this.formBuilder.group({
    fname: '',
    mname: '',
    lname: '',
    email: '',
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

  shouldSubmitForm: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private apiService: ApiService, private formBuilder: FormBuilder) {}

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

    /*this.bannerText = "This is an example of the bottom banner text. It should be large enough to be clearly legible by students looking at the interface, " + 
      "and should catch their attention without being annoying or distracting.";

    this.updateBannerTextForm();*/

    this.reasons.push(new Reason(0, "General Questions", false));
    this.reasons.push(new Reason(1, "Reason 1", true));
    this.reasons.push(new Reason(2, "Reason 2", false));
    this.reasons.push(new Reason(3, "Reason 3", true));
    this.reasons.push(new Reason(4, "Reason 4 with a really long name", false));
    this.reasons.push(new Reason(5, "Reason5WithAReallyReallyLongName", true));
    this.reasons.push(new Reason(6, "Reason 6", false));
    this.reasons.push(new Reason(7, "Reason 7", true));
    this.reasons.push(new Reason(8, "Reason 8", false));
    this.reasons.push(new Reason(9, "Reason 9", true));
    this.reasons.push(new Reason(10, "Reason 10", false));
    this.reasons.push(new Reason(11, "Reason 11", true));
    this.reasons.push(new Reason(12, "Reason 12", false));
    this.reasons.push(new Reason(13, "Reason 13", true));
    this.reasons.push(new Reason(14, "Reason 14 with a really long name", false));
    this.reasons.push(new Reason(15, "Reason15WithAReallyReallyLongName", true));
    this.reasons.push(new Reason(16, "Reason 16", false));
    this.reasons.push(new Reason(17, "Reason 17", true));
    this.reasons.push(new Reason(18, "Reason 18", false));
    this.reasons.push(new Reason(19, "Reason 19", true));

    //this.refreshData();
  }

  ngOnViewInit() {
    this.selectedAdvisor = this.advisors[0];
    this.updateAdvisorInfoForm();

    if(this.reasons && this.reasons[0]) {
      console.log("testing 1 2 3");
      this.reasonSetToEditMode();
    }
    // everything above this is temporary - remove when testing with server
    this.refreshData();
  }

  // refreshes all data from the API and takes appropriate actions on the page based on the data received
  refreshData() {
    // GET advisors
    this.apiService.getAllAdvisors().subscribe((data: Advisor[]) => {
      console.log("FETCHING ADVISORS: ", data);
      this.advisors = data;

      // GET student queues
      this.apiService.getAllStudentQueues().subscribe((data: any[]) => {
        console.log("FETCHING STUDENT QUEUES: ", data);

        let i = 0;
        for(let advisor of this.advisors) {
          if(data[advisor.id]) {
            this.advisors[i].studentQueue = data[advisor.id];
          }

          i++;
        }

        this.selectedAdvisor = this.advisors[0];
        this.updateAdvisorInfoForm();
      });
    });

    // GET banner text
    this.apiService.getBannerInfo().subscribe((data: any) => {
      console.log("FETCHING BANNER INFO: ", data);
      this.bannerText = data;
      this.selectReason(0);
      this.updateBannerTextForm();
    });

    // GET reasons
    this.apiService.getAllReasons().subscribe((data: Reason[]) => {
      console.log("FETCHING REASONS: ", data);
      this.reasons = data;
      //this.selectReason(0);

      if(this.reasons && this.reasons[0]) {
        this.reasonSetToEditMode();
      }
    });
  }

  // signs out of the interface (will be routed back to the interface picker)
  logout() {
    console.log("logout");
    this.authService.logout();
  }

  /* -------------------- STUDENT QUEUE STUFF -------------------- */
  // swaps a student in the queue with the student above them
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

        /*let tempSwapStudent = this.selectedAdvisor.studentQueue[i - 1];
        this.selectedAdvisor.studentQueue[i - 1] = this.selectedAdvisor.studentQueue[i];
        this.selectedAdvisor.studentQueue[i] = tempSwapStudent;*/

        // PUT student into new queue position
        // The student position starts at 1, not 0 like the studentQueue array. 
        // Therefore, a 'newPosition' of 'i' is equivalent to studentQueue[i - 1].
        let studentMoveInfo = 
        `{
          "username": ${this.selectedAdvisor.studentQueue[i].username},
          "newPosition": ${i},
        }`;

        this.apiService.moveStudentInQueue(this.selectedAdvisor.id, studentMoveInfo);
      }, 250);
    }
  }

  // swaps a student in the queue with the student below them
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

        /*let tempSwapStudent = this.selectedAdvisor.studentQueue[i + 1];
        this.selectedAdvisor.studentQueue[i + 1] = this.selectedAdvisor.studentQueue[i];
        this.selectedAdvisor.studentQueue[i] = tempSwapStudent;*/

        // PUT student into new queue position
        // The student position starts at 1, not 0 like the studentQueue array. 
        // Therefore, a 'newPosition' of 'i + 2' is equivalent to studentQueue[i + 1].
        let studentMoveInfo = 
        `{
          "username": ${this.selectedAdvisor.studentQueue[i].username},
          "newPosition": ${i + 2},
        }`;

        this.apiService.moveStudentInQueue(this.selectedAdvisor.id, studentMoveInfo);
      }, 250);
    }
  }
  
  queueDeleteStudent(i: number) {
    // DELETE student from queue
    let studentToDelete = 
    `{
      "username": ${this.selectedAdvisor.studentQueue[i].username}
    }`;

    this.apiService.deleteStudentFromQueue(this.selectedAdvisor.id, studentToDelete);

    //this.selectedAdvisor.studentQueue.splice(i, 1);
    this.deletePopup();
  }

  /* -------------------- ADVISOR LIST STUFF -------------------- */
  // selects an advisor in the list given that advisor's data
  selectAdvisor(advisor: Advisor) {
    this.selectedAdvisor = advisor;
    this.updateAdvisorInfoForm();
  }

  // updates the advisor info form with the currently selected advisor's info
  updateAdvisorInfoForm() {
    this.advisorInfoForm = this.formBuilder.group({
      fname: this.selectedAdvisor.firstName,
      mname: this.selectedAdvisor.middleName,
      lname: this.selectedAdvisor.lastName,
      email: this.selectedAdvisor.email,
      portraitURL: this.selectedAdvisor.portraitURL
    });
  }

  // saves the modified advisor info to the API from the advisor info form
  saveAdvisorInfo() {
    // PUT updated advisor info into advisor info on server
    let advisorInfoToUpdate = 
    `{
      "firstName": ${this.advisorInfoForm.get("fname")?.value},
      "middleName": ${this.advisorInfoForm.get("mname")?.value},
      "lastName": ${this.advisorInfoForm.get("lname")?.value},
      "email": ${this.advisorInfoForm.get("email")?.value},
      "portraitURL": ${this.advisorInfoForm.get("portraitURL")?.value},
      "enabled": true
    }`;

    console.log("advisorInfoToUpdate: ", advisorInfoToUpdate);

    this.apiService.updateAdvisor(this.selectedAdvisor.id, advisorInfoToUpdate);
  }

  // swaps an advisor in the list with the advisor above them (NOT IN USE - NO API ENDPOINT)
  /*listMoveAdvisorUp(i: number) {
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
  }*/

  // swaps an advisor in the list with the advisor below them (NOT IN USE - NO API ENDPOINT)
  /*listMoveAdvisorDown(i: number) {
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
  }*/
  
  // deletes an advisor from the list given their id
  listDeleteAdvisor(i: number) {
    if(this.advisors.length == 1) {
      this.selectedAdvisor = {id: -1, firstName: "", middleName: "", lastName: "", email: "", portraitURL: "", studentQueue: []};
    }
    else if(this.advisors[i] == this.selectedAdvisor && this.advisors[i + 1]) {
      this.selectedAdvisor = this.advisors[i + 1];
    }
    else {
      this.selectedAdvisor = this.advisors[0];
    }

    // DELETE advisor from API
    this.apiService.deleteAdvisor(i);
    // temp
    //this.advisors.splice(i, 1);
    this.deletePopup();
  }

  /* -------------------- BANNER INFO STUFF -------------------- */
  updateBannerTextForm() {
    this.bannerForm = this.formBuilder.group({ bannerText: this.bannerText });
  }

  saveBannerText() {

  }

  /* -------------------- REASON MANAGER STUFF -------------------- */
  // adds a new reason to the API if the reason form is set to 'add' mode, otherwise edits an existing reason using the reason form
  addOrSaveReason() {
    if(this.shouldSubmitForm) {
      if(this.addingReason) {
        this.reasonSetToEditMode();
        // POST new reason to API
        let reasonToAdd = 
        `{
          "name": ${this.reasonForm.get("rname")?.value}, 
          "needsAppt": ${this.reasonForm.get("rappt")?.value}
        }`;

        console.log("reasonToAdd: ", reasonToAdd);

        this.apiService.createReason(reasonToAdd);
        this.clearReasonForm();
      }
      else {
        // PUT existing reason in API
        let reasonToUpdate = 
        `{
          "name": ${this.reasonForm.get("rname")?.value}, 
          "needsAppt": ${this.reasonForm.get("rappt")?.value}
        }`;

        console.log("reasonToUpdate: ", reasonToUpdate);

        this.apiService.updateReason(this.selectedReason.id, reasonToUpdate);
        this.clearReasonForm();
      }
    }
  }

  // clears the form used for adding/editing reasons
  clearReasonForm() {
    this.reasonForm = this.formBuilder.group({
      rname: '',
      rappt: false
    });
  }

  // deletes the selected reason from the API
  deleteReason() {
    this.shouldSubmitForm = false;
    //for(let [i, reason] of this.reasons.entries()) {
    for(let reason of this.reasons) {
      if(reason == this.selectedReason) {
        // DELETE existing reason in API
        this.apiService.deleteReason(this.selectedReason.id);

        if(this.reasons[0]) {
          this.selectedReason = this.reasons[0];
        }

        //this.reasons.splice(i, 1);
        //this.selectedReason = new Reason(-1, "", false);
        this.updateReasonForm();
        this.shouldSubmitForm = true;
      }
    }
  }

  // selects a reason given its id
  selectReason(i: number) {
    /*if(document.getElementsByClassName("selected-reason")[0]) {
      document.getElementsByClassName("selected-reason")[0].classList.remove("selected-reason");
    }*/
    this.selectedReason = this.reasons[i];

    if(!this.selectedReason) {
      this.selectedReason = new Reason(-1, "", false);
    }

    /*if(document.getElementsByClassName("reason-item")[i]) {
      document.getElementsByClassName("reason-item")[i].classList.add("selected-reason");
    }*/

    this.updateReasonForm();
  }

  // updates the add/edit reason form with the currently selected reason's info
  updateReasonForm() {
    this.reasonForm = this.formBuilder.group({
      rname: this.selectedReason.name,
      rappt: this.selectedReason.needsAppt
    });
  }

  // sets the reason form to 'add mode', allowing it to add new reasons instead of edit existing reasons
  reasonSetToAddMode() {
    this.selectedReason = new Reason(-1, "", false);
    this.updateReasonForm();

    this.addingReason = true;
    document.getElementsByClassName("add-reason-subtitle")[0].classList.remove("toggled-off");
    document.getElementsByClassName("edit-reason-subtitle")[0].classList.add("toggled-off");
  }

  // sets the reason form to 'edit mode', allowing it to edit existing reasons instead of add new reasons
  reasonSetToEditMode() {
    this.addingReason = false;
    this.selectReason(0);
    document.getElementsByClassName("edit-reason-subtitle")[0].classList.remove("toggled-off");
    document.getElementsByClassName("add-reason-subtitle")[0].classList.add("toggled-off");
  }

  /* -------------------- ADD ADVISOR STUFF -------------------- */
  // adds a new advisor to the API using info from the 'add advisor' form
  addAdvisor() {
    if(this.shouldSubmitForm) {
      // POST new advisor to API
      let advisorToAdd = 
      `{
        "firstName": ${this.addAdvisorForm.get("fname")?.value}, 
        "middleName": ${this.addAdvisorForm.get("mname")?.value}, 
        "lastName": ${this.addAdvisorForm.get("lname")?.value}, 
        "email": ${this.addAdvisorForm.get("email")?.value}, 
        "portraitURL": ${this.addAdvisorForm.get("portraitURL")?.value}
      }`;

      console.log("advisorToAdd: ", advisorToAdd);

      this.apiService.createAdvisor(advisorToAdd);
      this.clearAddAdvisorForm();
    }
  }

  // clears the form used for adding new advisors
  clearAddAdvisorForm() {
    this.addAdvisorForm = this.formBuilder.group({
      fname: '',
      mname: '',
      lname: '',
      email: '', 
      portraitURL: ''
    });
  }

  /* -------------------- ADD STUDENT STUFF -------------------- */
  // adds a new student to the API using info from the 'add student' form
  addStudent() {
    if(this.shouldSubmitForm) {
      // POST new student to API
      let studentToAdd = 
      `{
        "studentName": ${this.addStudentForm.get("name")?.value}, 
        "username": ${this.addStudentForm.get("username")?.value}, 
        "appointment": false, 
        "reasons": [], 
        "meetingHost": ${this.selectedAdvisor.id},
        "timeIn": ${new Date().toString()}
      }`;

      console.log("studentToAdd: ", studentToAdd);
    
      this.apiService.checkInStudent(studentToAdd);
      this.clearAddStudentForm();
    }
  }

  // clears the form used for adding new students
  clearAddStudentForm() {
    this.addStudentForm = this.formBuilder.group({
      name: '',
      username: ''
    });
  }

  /* -------------------- POPUP STUFF -------------------- */
  // uses the provided info to create a popup box with up to three buttons
  createConfirmPopup(popupTitle: string, popupText: string, buttons: any) {
    (document.getElementsByClassName("popup-background-area")[0] as HTMLDivElement).style.display = "flex";
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

  // displays the 'Manage Reasons' popup
  createReasonPopup() {
    this.shouldSubmitForm = true;
    (document.getElementsByClassName("popup-background-area")[0] as HTMLDivElement).style.display = "flex";
    (document.getElementById("reason") as HTMLDivElement).style.display = "flex";
  }

  // displays the 'Add Student' popup
  createAddStudentPopup() {
    this.shouldSubmitForm = true;
    (document.getElementsByClassName("popup-background-area")[0] as HTMLDivElement).style.display = "flex";
    (document.getElementById("add-student") as HTMLDivElement).style.display = "flex";
  }

  // displays the 'Add Advisor' popup
  createAddAdvisorPopup() {
    this.shouldSubmitForm = true;
    (document.getElementsByClassName("popup-background-area")[0] as HTMLDivElement).style.display = "flex";
    (document.getElementById("add-advisor") as HTMLDivElement).style.display = "flex";
  }

  // removes a currently active popup box
  deletePopup() {
    this.popupTitle = "";
    this.popupText = "";
    this.shouldSubmitForm = false;

    this.addingReason = false;

    this.clearAddAdvisorForm();
    this.clearAddStudentForm();

    (document.getElementsByClassName("popup-background-area")[0] as HTMLDivElement).style.display = "none";
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
        ["YES", `listDeleteAdvisor(${i})`, "red"], 
        ["NO", "deletePopup()", "gray"]
      ]
    );
  }
}
