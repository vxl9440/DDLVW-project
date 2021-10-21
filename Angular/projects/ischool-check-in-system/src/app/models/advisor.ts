import { Student } from "./student";

export class Advisor {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    portraitURL: string;
    studentQueue: Student[];
}
