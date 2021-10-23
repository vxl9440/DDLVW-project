export class Student {
    studentName: string;
    username: string;
    timeIn: string;
    appointment?: {
        startTime: string;
        endTime: string;
    };

    constructor(studentName: string, username: string, timeIn: string, appointment?: {startTime: string, endTime: string}) {
        this.studentName = studentName;
        this.username = username;
        this.timeIn = timeIn;
        this.appointment =  appointment;
    }
}
