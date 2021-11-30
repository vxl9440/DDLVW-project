// Created by Drew Bissen of Team DDLVW
// Senior Development Project II
// Last modified 11/30/2021

import { Component, OnInit } from '@angular/core';
import { Advisor } from '../../models/advisor';
import { Reason } from '../../models/reason';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-front-desk-interface',
  templateUrl: './front-desk-interface.component.html',
  styleUrls: ['./front-desk-interface.component.scss']
})
export class FrontDeskInterfaceComponent implements OnInit {
  title = 'front-desk-interface';
  environment: any;
  connected: boolean = false; // whether or not we are connected to the server

  advisors: Advisor[] = [];
  selectedAdvisor: Advisor = { // the currently selected advisor from the advisors list
    id: -1, 
    firstName: "", 
    middleName: "", 
    lastName: "", 
    email: "", 
    portraitURL: "", 
    studentQueue: []
  };

  advisorInfoForm = this.formBuilder.group({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    portraitURL: ''
  });

  selectedFiles: File[] = []; // the files selected by the user to be uploaded to the server
  imagesOnServer: any[] = [];

  reasons: Reason[] = [];
  selectedReason: Reason = new Reason(-1, "", false); // the currently selected reason from the reasons list
  addingReason: boolean = true; // if true, we are adding a reason. If false, we are editing a reason.
  reasonForm = this.formBuilder.group({
    rname: '',
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

  oldAdvisors: Advisor[]; // used to check for changes in the advisor list
  oldReasons: Reason[]; // used to check for changes in the reason list

  buttonActions: string[] = ["deletePopup()", "", ""];
  popupTitle: string = "";
  popupText: string = "";
  popupButton1Text: string = "OK";
  popupButton2Text: string = "";
  popupButton3Text: string = "";

  shouldSubmitForm: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private apiService: ApiService, private formBuilder: FormBuilder) {
    this.environment = environment;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.connect();
  }

  // refreshes all data from the API and takes appropriate actions on the page based on the data received
  refreshData() {
    this.oldAdvisors = this.advisors;
    this.oldReasons = this.reasons;

    // GET advisors
    this.apiService.getAllAdvisors().subscribe((advisorData: Advisor[]) => {
      this.connected = true;
      console.log("FETCHING ADVISORS: ", advisorData);

      // GET student queues
      this.apiService.getAllStudentQueues().subscribe((studentData: any[]) => {
        console.log("FETCHING STUDENT QUEUES: ", studentData);

        let selectedAdvisorId = 0;

        let i = 0;
        for(let advisor of advisorData) {
          // attaches student queues to advisors if they exist
          if(studentData[advisor.id]) {
            advisorData[i].studentQueue = studentData[advisor.id];
          }

          // refreshes the selected advisor
          if(advisor.id == this.selectedAdvisor.id) {
            selectedAdvisorId = i;
          }
          
          i++;
        }

        // only refreshes the advisor/student queue info if it has actually changed on the server
        if(JSON.stringify(this.oldAdvisors) != JSON.stringify(advisorData)) {
          console.log("Advisor/student queue data changed on server - refreshing advisor/student queue info on interface.");
          this.advisors = advisorData;

          // sets the selected advisor (defaults to the first advisor if they exist)
          if(this.advisors && this.advisors[0]) {
            this.selectedAdvisor = this.advisors[selectedAdvisorId];
          }

          this.updateAdvisorInfoForm();
        }
        else {
          console.log("No refresh of advisor/student queue data needed.");
        }
      });
    });

    // GET banner image names
    this.apiService.getAnnouncements().subscribe((data: any[]) => {
      console.log("FETCHING BANNER IMAGE NAMES: ", data);
      this.imagesOnServer = data;
    });

    // GET reasons
    this.apiService.getAllReasons().subscribe((reasonData: Reason[]) => {
      console.log("FETCHING REASONS: ", reasonData);
      this.oldReasons = this.reasons;

      // only refreshes the reasons info if it has actually changed on the server
      if(JSON.stringify(reasonData) != JSON.stringify(this.oldReasons)) {
        console.log("Reason data changed on server - refreshing reasons on interface.");
        this.reasons = reasonData;

        // if any reasons exist, default the reason manager to 'edit mode'
        if(this.reasons && this.reasons[0]) {
          this.reasonSetToEditMode();
        }
      }
      else {
        console.log("No refresh of reason data needed.");
      }
    });
  }

  // runs the loop that gets all required data intermittently
  connect() {
    this.refreshData();

    setInterval(() => {
      this.refreshData();
    }, 10000);
  }

  // signs out of the interface (will be routed back to the interface picker)
  logout() {
    console.log("Logging out.");
    this.authService.logout();
  }

  /* -------------------- STUDENT QUEUE STUFF -------------------- */
  // swaps a student in the queue with the student above them
  queueMoveStudentUp(i: number) {
    // student queue is refreshed before action to prevent making bad requests with server
    // GET student queues
    this.apiService.getAllStudentQueues().subscribe((studentData: any[]) => {
      console.log("FETCHING STUDENT QUEUES: ", studentData);

      this.selectedAdvisor.studentQueue = studentData[this.selectedAdvisor.id];

      // only swaps students if the two students exist
      if(this.selectedAdvisor.studentQueue[i - 1]) {
        setTimeout(() => { // if this timeout is not here, the animation won't play. I have no idea why.
          // animate swapping the student up
          let studentItem = (document.getElementsByClassName("student-item")[i] as HTMLDivElement);
          studentItem.style.animation = "swap-student-up";
          studentItem.style.animationDuration = "0.3s";
          studentItem.style.animationFillMode = "forwards";

          // animate swapping the student down
          let aboveStudentItem = (document.getElementsByClassName("student-item")[i - 1] as HTMLDivElement);
          aboveStudentItem.style.animation = "swap-student-down";
          aboveStudentItem.style.animationDuration = "0.3s";
          aboveStudentItem.style.animationFillMode = "forwards";
        }, 0);

        setTimeout(() => {
          // The student position starts at 1, not 0 like the studentQueue array. 
          // Therefore, a 'newPosition' of 'i' is equivalent to studentQueue[i - 1].
          let studentMoveInfo = 
          {
            "username": this.selectedAdvisor.studentQueue[i].username,
            "newPosition": i
          };

          // PUT student into new queue position
          this.apiService.moveStudentInQueue(this.selectedAdvisor.id, studentMoveInfo).subscribe(() => {
            console.log("Student successfully moved up in queue.");
            this.refreshData();
          });
        }, 300);
      }
    });
  }

  // swaps a student in the queue with the student below them
  queueMoveStudentDown(i: number) {
    // student queue is refreshed before action to prevent making bad requests with server
    // GET student queues
    this.apiService.getAllStudentQueues().subscribe((studentData: any[]) => {
      console.log("FETCHING STUDENT QUEUES: ", studentData);

      this.selectedAdvisor.studentQueue = studentData[this.selectedAdvisor.id];

      // only swaps students if the two students exist
      if(this.selectedAdvisor.studentQueue[i + 1]) {
        setTimeout(() => { // if this timeout is not here, the animation won't play. I have no idea why.
          // animate swapping the student down
          let studentItem = (document.getElementsByClassName("student-item")[i] as HTMLDivElement);
          studentItem.style.animation = "swap-student-down";
          studentItem.style.animationDuration = "0.3s";
          studentItem.style.animationFillMode = "forwards";

          // animate swapping the student up
          let belowStudentItem = (document.getElementsByClassName("student-item")[i + 1] as HTMLDivElement);
          belowStudentItem.style.animation = "swap-student-up";
          belowStudentItem.style.animationDuration = "0.3s";
          belowStudentItem.style.animationFillMode = "forwards";
        }, 0);

        setTimeout(() => {
          // The student position starts at 1, not 0 like the studentQueue array. 
          // Therefore, a 'newPosition' of 'i + 2' is equivalent to studentQueue[i + 1].
          let studentMoveInfo = 
          {
            "username": this.selectedAdvisor.studentQueue[i].username,
            "newPosition": i + 2
          };

          // PUT student into new queue position
          this.apiService.moveStudentInQueue(this.selectedAdvisor.id, studentMoveInfo).subscribe(() => {
            console.log("Student successfully moved down in queue.");
            this.refreshData();
          });
        }, 300);
      }
    });
  }
  
  // deletes a student from the selected advisor's student queue given the student id.
  queueDeleteStudent(i: number) {
    let studentToDelete = this.selectedAdvisor.studentQueue[i].username;

    // DELETE student from queue
    this.apiService.deleteStudentFromQueue(this.selectedAdvisor.id, studentToDelete).subscribe(() => {
      console.log("Student successfully deleted from queue.");
      this.deletePopup();
      this.refreshData();
    });
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
    let advisorInfoToUpdate = 
    {
      "firstName": this.advisorInfoForm.get("fname")?.value,
      "middleName": this.advisorInfoForm.get("mname")?.value,
      "lastName": this.advisorInfoForm.get("lname")?.value,
      "email": this.advisorInfoForm.get("email")?.value,
      "portraitURL": this.advisorInfoForm.get("portraitURL")?.value,
      "enabled": true
    };

    // PUT updated advisor info into advisor info on server
    this.apiService.updateAdvisor(this.selectedAdvisor.id, advisorInfoToUpdate).subscribe(() => {
      console.log("Advisor info successfully updated.");
      this.refreshData();
    });
  }

  // swaps an advisor in the list with the advisor above them (NOT IN USE - NO API ENDPOINT. ALSO, THINGS HAVE CHANGED SINCE THIS WAS HIDDEN - IT MIGHT NOT WORK).
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

  // swaps an advisor in the list with the advisor below them (NOT IN USE - NO API ENDPOINT. ALSO, THINGS HAVE CHANGED SINCE THIS WAS HIDDEN - IT MIGHT NOT WORK)
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
  
  // deletes an advisor from the list given their id (NOT IN USE - ADVISORS CAN NO LONGER BE DELETED. ALSO, THINGS HAVE CHANGED SINCE THIS WAS HIDDEN - IT MIGHT NOT WORK ANYMORE)
  /*listDeleteAdvisor(i: number) {
    if(this.advisors.length == 1) {
      this.selectedAdvisor = {id: -1, firstName: "", middleName: "", lastName: "", email: "", portraitURL: "", studentQueue: []};
    }
    else if(this.advisors[i] == this.selectedAdvisor && this.advisors[i + 1]) {
      this.selectedAdvisor = this.advisors[i + 1];
    }
    else {
      this.selectedAdvisor = this.advisors[0];
    }

    console.log("Advisor ID to delete: ", i);

    // DELETE advisor from API
    this.apiService.deleteAdvisor(i).subscribe(() => {
      console.log("Advisor successfully deleted.");
      this.refreshData();
      this.deletePopup();
    });
  }*/

  // enables or disables an advisor
  toggleAdvisorEnabled(i: number) {
    this.apiService.toggleAdvisorEnabled(i).subscribe(() => {
      console.log("Advisor successfully enabled/disabled.");
      this.refreshData();
      this.deletePopup();
    });
  }

  /* -------------------- BANNER INFO STUFF -------------------- */
  // runs whenever images are selected or unselected (?)
  onBannerFileSelected(event: any) {
    this.selectedFiles = <File[]>event.target.files;
  }

  // uploads any selected images to the server to be used as banner images on the Student Queue Interface
  uploadBannerImages() {
    // a new FormData is created containing all the selected images
    const fd = new FormData();
    for(let file of this.selectedFiles) {
      fd.append('announcement_files', file, file.name);
    }

    console.log("Uploading image(s)...");
    // POST new announcement images to the server
    this.apiService.createAnnouncements(fd).subscribe(() => {
      console.log("Image(s) successfully uploaded.");
      this.refreshData();
    });
  }

  // deletes all banner images from the server
  clearBanner() {
    console.log("Deleting all banner images...");
    // DELETE all banner images from the server
    this.apiService.deleteAnnouncements().subscribe(() => {
      console.log("Banner image(s) successfully deleted.");
      this.refreshData();
      this.deletePopup();
    });
  }

  /* -------------------- REASON MANAGER STUFF -------------------- */
  // adds a new reason to the API if the reason form is set to 'add' mode, otherwise edits an existing reason using the reason form
  addOrSaveReason() {
    if(this.shouldSubmitForm) {
      if(this.addingReason) {
        let reasonToAdd = 
        {
          "name": this.reasonForm.get("rname")?.value, 
          "needsAppt": this.reasonForm.get("rappt")?.value
        };

        // POST new reason to API
        this.apiService.createReason(reasonToAdd).subscribe(() => {
          console.log("Reason successfully added.");
          this.refreshData();
          this.clearReasonForm();
          this.reasonSetToEditMode();
        });
      }
      else {
        let reasonToUpdate = 
        {
          "name": this.reasonForm.get("rname")?.value, 
          "needsAppt": this.reasonForm.get("rappt")?.value
        };

        // PUT existing reason in API
        this.apiService.updateReason(this.selectedReason.id, reasonToUpdate).subscribe(() => {
          console.log("Reason successfully updated.");
          this.refreshData();
          this.clearReasonForm();
        });
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
    for(let reason of this.reasons) {
      if(reason == this.selectedReason) {
        // DELETE existing reason in API
        this.apiService.deleteReason(this.selectedReason.id).subscribe(() => {
          console.log("Reason successfully deleted.");
          if(this.reasons[0]) {
            this.selectedReason = this.reasons[0];
          }
  
          //this.selectedReason = new Reason(-1, "", false);
          this.shouldSubmitForm = false;
          this.updateReasonForm();
          setTimeout(() => {
            this.shouldSubmitForm = true;
          }, 50);
        });
      }
    }
  }

  // selects a reason given its id
  selectReason(i: number) {
    this.selectedReason = this.reasons[i];

    if(!this.selectedReason) {
      this.selectedReason = new Reason(-1, "", false);
    }

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
    this.selectedReason = new Reason(-1, "", false); // unselects whatever reason is currently selected
    this.updateReasonForm();

    this.addingReason = true;
    document.getElementsByClassName("add-reason-subtitle")[0].classList.remove("toggled-off");
    document.getElementsByClassName("edit-reason-subtitle")[0].classList.add("toggled-off");
  }

  // sets the reason form to 'edit mode', allowing it to edit existing reasons instead of add new reasons
  reasonSetToEditMode() {
    this.addingReason = false;
    this.selectReason(0);
    setTimeout(() => {
      document.getElementsByClassName("edit-reason-subtitle")[0].classList.remove("toggled-off");
      document.getElementsByClassName("add-reason-subtitle")[0].classList.add("toggled-off");
    }, 50);
  }

  /* -------------------- ADD ADVISOR STUFF -------------------- */
  // adds a new advisor to the API using info from the 'add advisor' form
  addAdvisor() {
    if(this.shouldSubmitForm) {
      let advisorToAdd = 
      {
        "firstName": this.addAdvisorForm.get("fname")?.value, 
        "middleName": this.addAdvisorForm.get("mname")?.value, 
        "lastName": this.addAdvisorForm.get("lname")?.value, 
        "email": this.addAdvisorForm.get("email")?.value, 
        "portraitURL": this.addAdvisorForm.get("portraitURL")?.value
      };

      // POST new advisor to API
      this.apiService.createAdvisor(advisorToAdd).subscribe(() => {
        console.log("Advisor successfully added.");
        this.clearAddAdvisorForm();
        this.deletePopup();
        this.refreshData();
      });
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
      let timeArray = new Date().toISOString().split(".");
      let timeIn = timeArray[0] + timeArray[1][timeArray[1].length - 1]; // the current time minus any fractional millisecond stuff (but still retaining the timezone identifier)
      let studentToAdd = 
      {
        "studentName": this.addStudentForm.get("name")?.value, 
        "username": this.addStudentForm.get("username")?.value, 
        "appointment": false, 
        "reasons": [], 
        "meetingHost": this.selectedAdvisor.id,
        "timeIn": timeIn
      };

      // POST new student to API
      this.apiService.checkInStudent(studentToAdd).subscribe(() => {
        console.log("Student successfully added.");
        this.clearAddStudentForm();
        this.deletePopup();
        this.refreshData();
      });
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

    // create button 1 if possible
    if(buttons[0]) {
      this.popupButton1Text = buttons[0][0];
      this.buttonActions[0] = buttons[0][1];
      document.getElementById("popup-button-1")?.classList.add(`popup-${buttons[0][2]}-button`);
    }

    // create button 2 if possible
    if(buttons[1]) {
      this.popupButton2Text = buttons[1][0];
      this.buttonActions[1] = buttons[1][1];
      document.getElementById("popup-button-2")?.classList.add(`popup-${buttons[1][2]}-button`);
    }

    // create button 3 if possible
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

  // creates a popup box for deleting an advisor from the advisor list (NOT IN USE - ADVISORS CAN NO LONGER BE DELETED).
  /*popupDeleteAdvisor(i: number) {
    let advisorName = `${this.advisors[i].firstName} ${this.advisors[i].lastName}`;

    this.createConfirmPopup(
      "Are You Sure?", 
      `Are you sure you want to delete ${advisorName}?`, 
      [
        ["YES", `listDeleteAdvisor(${this.advisors[i].id})`, "red"], 
        ["NO", "deletePopup()", "gray"]
      ]
    );
  }*/

  // creates a popup box for enabling an advisor
  popupEnableAdvisor(i: number) {
    let advisorName = `${this.advisors[i].firstName} ${this.advisors[i].lastName}`;

    this.createConfirmPopup(
      "Are You Sure?", 
      `Are you sure you want to enable ${advisorName} on the Student Queue Display?`, 
      [
        ["YES", `toggleAdvisorEnabled(this.advisors[${i}].id)`, "green"], 
        ["NO", "deletePopup()", "gray"]
      ]
    );
  }

  // creates a popup box for disabling an advisor
  popupDisableAdvisor(i: number) {
    let advisorName = `${this.advisors[i].firstName} ${this.advisors[i].lastName}`;

    this.createConfirmPopup(
      "Are You Sure?", 
      `Are you sure you want to disable ${advisorName} on the Student Queue Display?`, 
      [
        ["YES", `toggleAdvisorEnabled(this.advisors[${i}].id)`, "red"], 
        ["NO", "deletePopup()", "gray"]
      ]
    );
  }

  // creates a popup box for deleting the banner images on the server
  popupDeleteBannerImages() {
    this.createConfirmPopup(
      "Are You Sure?", 
      `Are you sure you want to delete all banner images on the server?`, 
      [
        ["YES", `clearBanner()`, "red"], 
        ["NO", "deletePopup()", "gray"]
      ]
    );
  }
}
