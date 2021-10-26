import { Student } from "./student";

export class Advisor {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    portraitURL: string;
    studentQueue: Student[];
}
