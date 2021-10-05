import { Component, OnInit } from '@angular/core';

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
  title = 'student-queue-interface';
  advisors: Advisor[] = [];
  imgPathStart: string = "../assets/";

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
    this.advisors.push({firstName: "George", lastName: "Guywithaverylongname", email: "gym1324@rit.edu", meetsWithWalkIns: true, img: "person1.jpg", studentQueue: [
      {firstName: "Tim", lastName: "Bim", img: "person1.jpg"}, 
      {firstName: "Rebecca", lastName: "Grobb", img: "person3.jpg"}, 
      {firstName: "Billy", lastName: "Mann", img: "person2.jpg"}, 
      {firstName: "Mikah", lastName: "Guell", img: "person4.jpg"}, 
      {firstName: "Diesel", lastName: "Feesel", img: "person2.jpg"}, 
      {firstName: "Dani", lastName: "Sel", img: "person3.jpg"}, 
      {firstName: "Larry", lastName: "Grobb", img: "person1.jpg"}, 
      {firstName: "Shima", lastName: "Plok", img: "person4.jpg"}, 
      {firstName: "Gus", lastName: "Juss", img: "person2.jpg"}, 
    ]});
  }
  
}