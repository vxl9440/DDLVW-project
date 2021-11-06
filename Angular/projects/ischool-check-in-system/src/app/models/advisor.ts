import { Student } from "./student";

export class Advisor {
    id?: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    portraitURL: string;
    studentQueue: Student[];
    enabled?: boolean;

    constructor(firstName: string, middleName: string, lastName: string, email: string, portraitURL: string, studentQueue: Student[], enabled?: boolean) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.portraitURL = portraitURL;
        this.studentQueue = studentQueue;
        this.enabled = enabled;
    }
}
