export class User {
    id!: number;
    nom!: string;
    prenom!: string;
    username!: string;
    mail!: string;
    password!: string;
    confirmPassword!: string;
    role!: string;
    editMode: boolean= false;
    status!: boolean;
    answeredQuestionnaires?: number;
}

