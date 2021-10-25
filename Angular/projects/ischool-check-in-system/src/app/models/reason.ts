export class Reason {
    reason: string;
    requiresAppt: boolean;

    constructor(reason: string, requiresAppt: boolean) {
        this.reason = reason;
        this.requiresAppt = requiresAppt;
    }
}