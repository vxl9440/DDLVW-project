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
  maxStudentsInList: number = 14;
  connected: boolean = false;
  timeSinceUpdate: string = "?";
  bannerText: string = "None";

  ngOnInit() {
    this.advisors.push({firstName: "Elissa", lastName: "Weeden", email: "jnd1234@rit.edu", meetsWithWalkIns: false, img: "ElissaWeeden.png", studentQueue: [
      {firstName: "Jack", lastName: "Smith", img: "person1.jpg"}, 
      {firstName: "Jane", lastName: "Doe", img: "person3.jpg"}, 
      {firstName: "Jill", lastName: "Smith", img: "person4.jpg"}
    ]});
    this.advisors.push({firstName: "Kevin", lastName: "Stiner", email: "rcs4321@rit.edu", meetsWithWalkIns: true, img: "KevinStiner.png", studentQueue: [
      {firstName: "Tim", lastName: "Bim", img: "person1.jpg"}, 
      {firstName: "Rebecca", lastName: "Grobb", img: "person3.jpg"}, 
      {firstName: "Billy", lastName: "Mann", img: "person2.jpg"}
    ]});
    this.advisors.push({firstName: "Betty", lastName: "Hillman", email: "gym1324@rit.edu", meetsWithWalkIns: true, img: "BettyHillman.png", studentQueue: [
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
    this.advisors.push({firstName: "Stephen", lastName: "Zilora", email: "jnd1234@rit.edu", meetsWithWalkIns: false, img: "StephenZilora.png", studentQueue: [
      {firstName: "Jack", lastName: "Smith", img: "person1.jpg"}, 
      {firstName: "Jane", lastName: "Doe", img: "person3.jpg"}, 
      {firstName: "Jill", lastName: "Smith", img: "person4.jpg"}, 
      {firstName: "Max", lastName: "Lile", img: "person1.jpg"}, 
      {firstName: "Dani", lastName: "Tuu", img: "person3.jpg"}, 
      {firstName: "Moe", lastName: "Bo", img: "person2.jpg"}
    ]});
    this.advisors.push({firstName: "Melissa", lastName: "Hanna", email: "jnd1234@rit.edu", meetsWithWalkIns: false, img: "MelissaHanna.png", studentQueue: []});
    this.advisors.push({firstName: "Kristen", lastName: "Shinohara", email: "gym1324@rit.edu", meetsWithWalkIns: true, img: "KristenShinohara.png", studentQueue: [
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

    this.connect();
  }
  
  connect() {
    //temp (for testing purposes)
    setTimeout(() => { 
      this.connected = true;
      this.updateInfo();
    }, 3000);
  }

  updateInfo() {
    this.timeSinceUpdate = "0";
    this.getBannerText();
  }

  getBannerText() {
    if(this.connected) {
      /*this.bannerText = "This is an example of the bottom banner text. It should be large enough to be clearly legible by students looking at the interface, " + 
      "and should catch their attention without being annoying or distracting. This is an example of the bottom banner text. It should be large enough to be " + 
      "clearly legible by students looking at the interface, and should catch their attention without being annoying or distracting. This is an example of the " + 
      "bottom banner text. It should be large enough to be clearly legible by students looking at the interface, and should catch their attention without being " + 
      "annoying or distracting. This is an example of the bottom banner text. It should be large enough to be clearly legible by students looking at the interface, " + 
      "and should catch their attention without being annoying or distracting.";*/
      this.bannerText = "This is an example of the bottom banner text. It should be large enough to be clearly legible by students looking at the interface, " + 
      "and should catch their attention without being annoying or distracting.";
      //this.bannerText = "";

      if(this.bannerText.length > 750) {
        this.bannerText = this.bannerText.slice(0, 746);
        this.bannerText += " ...";
      }
    }
  }
}