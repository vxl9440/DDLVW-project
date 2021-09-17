import { Component, OnInit } from '@angular/core';

interface Student {
  firstName: String,
  lastName: String,
  imgPath: String
}

interface Advisor {
  firstName: String,
  lastName: String,
  imgPath: String,
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

  ngOnInit() {
    this.advisors.push({firstName: "John", lastName: "Doe", imgPath: "../assets/person2.jpg", studentQueue: [
      {firstName: "Jack", lastName: "Smith", imgPath: "../assets/person1.jpg"}, 
      {firstName: "Jane", lastName: "Doe", imgPath: "../assets/person3.jpg"}, 
      {firstName: "Jill", lastName: "Smith", imgPath: "../assets/person4.jpg"}
    ]});
    this.advisors.push({firstName: "Rachel", lastName: "Smachel", imgPath: "../assets/person4.jpg", studentQueue: [
      {firstName: "Tim", lastName: "Bim", imgPath: "../assets/person1.jpg"}, 
      {firstName: "Rebecca", lastName: "Grobb", imgPath: "../assets/person3.jpg"}, 
      {firstName: "Billy", lastName: "Mann", imgPath: "../assets/person2.jpg"}
    ]});
  }
  
}