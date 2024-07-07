import { User } from './user';

export class Mentor extends User {
  specialite!: string;
  active!: boolean;
  //carriereId!: number;

  constructor(user: User = new User(), specialite: string = '', active: boolean = true, carriereId: number = 0) {
    super();
    this.id = user.id;
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.username = user.username;
    this.mail = user.mail;
    this.password = user.password;
    this.confirmPassword = user.confirmPassword;
    this.role = user.role;
    this.editMode = user.editMode;
    this.status = user.status;
    this.answeredQuestionnaires = user.answeredQuestionnaires;

    this.specialite = specialite;
    this.active = active;
   
  }
}
