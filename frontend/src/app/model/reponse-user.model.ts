// src/app/model/reponse-user.ts

import { User } from './user';
import { Question } from './questionnaire';

export class ReponseUser {
    id?: number;
    reponseTextuelle?: string;
    reponseChoisie?: string;
    date?: Date;
    user!: User;
    question!: Question;
    
}
