import { Carriere } from './carriere.model';
import { Mentor } from './mentor.model';
import { User } from './user';

export interface VideoMentor {
  id: number;
  fileName: string;
  title: string;
  url: string;
  carriere: Carriere;
  mentor: Mentor;
  user: User
}

// Ajoutez ceci pour obtenir carriereId et mentorId
export class VideoMentorImpl implements VideoMentor {
  id: number;
  fileName: string;
  title: string;
  url: string;
  carriere: Carriere;
  mentor: Mentor;
  user: User

  constructor(id: number, fileName: string, title: string, url: string, carriere: Carriere, mentor: Mentor, user: User) {
    this.id = id;
    this.fileName = fileName;
    this.title = title;
    this.url = url;
    this.carriere = carriere;
    this.mentor = mentor;
    this.user = user;
  }

  get carriereId(): number {
    return this.carriere.id;
  }

  get mentorId(): number {
    return this.mentor.id;
  }
}
