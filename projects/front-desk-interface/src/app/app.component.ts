import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

interface Student {
  firstName: String,
  lastName: String,
  img: String
}

interface Advisor {
  firstName: String,
  lastName: String,
  email: String,
  meetsWithWalkIns: boolean,
  img: String,
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
  selectedAdvisor: Advisor = {firstName: "", lastName: "", email: "", meetsWithWalkIns: false, img: "", studentQueue: []};

  advisorInfoForm = this.formBuilder.group({
    fname: '',
    lname: '',
    email: '',
    //photo: '',
    meetsWithWalkIns: ''
  });

  imgPathStart: string = "../assets/";

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.advisors.push({firstName: "John", lastName: "Doe", email: "jnd1234@rit.edu", meetsWithWalkIns: false, img: "person2.jpg", studentQueue: [
      {firstName: "Jack", lastName: "Smith", img: "person1.jpg"}, 
      {firstName: "Jane", lastName: "Doe", img: "person3.jpg"}, 
      {firstName: "Jill", lastName: "Smith", img: "person4.jpg"}
    ]});
    this.advisors.push({firstName: "Rachel", lastName: "Smachel", email: "rcs4321@rit.edu", meetsWithWalkIns: true, img: "person4.jpg", studentQueue: [
      {firstName: "Tim", lastName: "Bim", img: "person1.jpg"}, 
      {firstName: "Rebecca", lastName: "Grobb", img: "person3.jpg"}, 
      {firstName: "Billy", lastName: "Mann", img: "person2.jpg"}
    ]});
    this.advisors.push({firstName: "George", lastName: "Guywithaveryveryverylongname", email: "gym1324@rit.edu", meetsWithWalkIns: true, img: "person1.jpg", studentQueue: [
      {firstName: "Tim", lastName: "Bim", img: "person1.jpg"}, 
      {firstName: "Rebecca", lastName: "Grobb", img: "person3.jpg"}, 
      {firstName: "Billy", lastName: "Mann", img: "person2.jpg"}, 
      {firstName: "Mikah", lastName: "Guell", img: "person4.jpg"}, 
      {firstName: "Diesel", lastName: "Feesel", img: "person2.jpg"}, 
      {firstName: "Dani", lastName: "Sel", img: "person3.jpg"}, 
      {firstName: "Larry", lastName: "Grobb", img: "person1.jpg"}, 
      {firstName: "Shima", lastName: "Plok", img: "person4.jpg"}, 
      {firstName: "Gus", lastName: "Juss", img: "person2.jpg"}, 
      {firstName: "Tim", lastName: "Bim", img: "person1.jpg"}, 
      {firstName: "Rebecca", lastName: "Grobb", img: "person3.jpg"}, 
      {firstName: "Billy", lastName: "Mann", img: "person2.jpg"}, 
      {firstName: "Mikah", lastName: "Guell", img: "person4.jpg"}, 
      {firstName: "Diesel", lastName: "Feesel", img: "person2.jpg"}, 
      {firstName: "Dani", lastName: "Sel", img: "person3.jpg"}, 
      {firstName: "Larry", lastName: "Grobb", img: "person1.jpg"}, 
      {firstName: "Shima", lastName: "Plok", img: "person4.jpg"}, 
      {firstName: "Gus", lastName: "Juss", img: "person2.jpg"}
    ]});
    this.advisors.push({firstName: "Sabrina", lastName: "Quazz", email: "stq2413@rit.edu", meetsWithWalkIns: false, img: "person3.jpg", studentQueue: []});

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

  deleteStudentFromQueue(advisor: Advisor, i: number) {
    advisor.studentQueue.splice(i, 1);
  }
}
