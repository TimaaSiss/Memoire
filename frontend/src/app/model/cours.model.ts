export class Course {
  id: number;
  titre: string;
  description: string;
  duree: string;
  urlCours: string;
  niveau: string;
  mentorId: number;
  userId: number;
  formationId: number;

  constructor() {
      this.id = 0;
      this.titre = '';
      this.description = '';
      this.duree = '';
      this.urlCours = '';
      this.niveau = '';
      this.mentorId = 0;
      this.userId = 0;
      this.formationId = 0;
  }
}
