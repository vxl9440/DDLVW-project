import { UserRole } from "./user-role";

interface Serializable<T> {
    deserialize(input: Object): T;
}

export class User implements Serializable<User> {
    firstname: string;
    lastname: string;
    email: string;
    role: UserRole;
    token?: string;

    deserialize(input: { firstname: string; lastname: string; email: string; role: string; }) {
        this.firstname = input.firstname;
        this.lastname = input.lastname;
        this.email = input.email; 
        switch(input.role) {
            case 'admin': { this.role = UserRole.Admin; break; }
            case 'advisor': { this.role = UserRole.Advisor; break }
            case 'manager': { this.role = UserRole.Manager; break }
        }
        
        return this;
    }

    static isValidUser(obj: any): obj is User {
        return typeof obj.firstname === 'string' &&
               typeof obj.lastname === 'string' &&
               typeof obj.email === 'string' &&
               typeof obj.role === 'string' &&
               ['advisor', 'admin', 'manager'].includes(obj.role);
    }
}
