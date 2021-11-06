export class Reason {
    name: string;
    needsAppt: boolean;

    constructor(name: string, needsAppt: boolean) {
        this.name = name;
        this.needsAppt = needsAppt;
    }
}