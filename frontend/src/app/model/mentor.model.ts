import { User } from "./user";


export class Mentor extends User {
    specialite!: string;
    active!: boolean;
    carriereId!: number;
}