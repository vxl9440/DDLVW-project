export class Reason {
    id: number;
    name: string;
    needsAppt: boolean;

    constructor(id: number, name: string, needsAppt: boolean) {
        this.id = id;
        this.name = name;
        this.needsAppt = needsAppt;
    }
}