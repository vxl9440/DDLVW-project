import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

interface Student {
  firstName: String,
  lastName: String,
  imgPath: String
}

interface Advisor {
  firstName: String,
  lastName: String,
  email: String,
  meetsWithWalkIns: boolean,
  imgPath: String,
  studentQueue: Student[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-desk-interface';
  advisors: Advisor[] = [];
  selectedAdvisor: Advisor = {firstName: "", lastName: "", email: "", meetsWithWalkIns: false, imgPath: "", studentQueue: []};

  advisorInfoForm = this.formBuilder.group({
    fname: '',
    lname: '',
    email: '',
    //photo: '',
    meetsWithWalkIns: ''
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.advisors.push({firstName: "John", lastName: "Doe", email: "jnd1234@rit.edu", meetsWithWalkIns: false, imgPath: "../assets/person2.jpg", studentQueue: [
      {firstName: "Jack", lastName: "Smith", imgPath: "../assets/person1.jpg"}, 
      {firstName: "Jane", lastName: "Doe", imgPath: "../assets/person3.jpg"}, 
      {firstName: "Jill", lastName: "Smith", imgPath: "../assets/person4.jpg"}
    ]});
    this.advisors.push({firstName: "Rachel", lastName: "Smachel", email: "rcs4321@rit.edu", meetsWithWalkIns: true, imgPath: "../assets/person4.jpg", studentQueue: [
      {firstName: "Tim", lastName: "Bim", imgPath: "../assets/person1.jpg"}, 
      {firstName: "Rebecca", lastName: "Grobb", imgPath: "../assets/person3.jpg"}, 
      {firstName: "Billy", lastName: "Mann", imgPath: "../assets/person2.jpg"}
    ]});
    this.advisors.push({firstName: "George", lastName: "Guywithaverylongname", email: "gym1324@rit.edu", meetsWithWalkIns: true, imgPath: "../assets/person1.jpg", studentQueue: [
      {firstName: "Tim", lastName: "Bim", imgPath: "../assets/person1.jpg"}, 
      {firstName: "Rebecca", lastName: "Grobb", imgPath: "../assets/person3.jpg"}, 
      {firstName: "Billy", lastName: "Mann", imgPath: "../assets/person2.jpg"}, 
      {firstName: "Mikah", lastName: "Guell", imgPath: "../assets/person4.jpg"}, 
      {firstName: "Diesel", lastName: "Feesel", imgPath: "../assets/person2.jpg"}, 
      {firstName: "Dani", lastName: "Sel", imgPath: "../assets/person3.jpg"}, 
      {firstName: "Larry", lastName: "Grobb", imgPath: "../assets/person1.jpg"}, 
      {firstName: "Shima", lastName: "Plok", imgPath: "../assets/person4.jpg"}, 
      {firstName: "Gus", lastName: "Juss", imgPath: "../assets/person2.jpg"}, 
    ]});
    this.advisors.push({firstName: "Sabrina", lastName: "Quazz", email: "stq2413@rit.edu", meetsWithWalkIns: false, imgPath: "../assets/person3.jpg", studentQueue: []});

    this.selectedAdvisor = this.advisors[0];

    this.updateAdvisorInfoForm();
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
      email: this.selectedAdvisor.email,
      //photo: '',
      meetsWithWalkIns: this.selectedAdvisor.meetsWithWalkIns
    });
  }

  saveAdvisorInfo() {

  }
}
