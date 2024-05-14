export class Questionnaire {
  id: number;
  titre: string;
  questions: Question[];

  constructor(id: number, titre: string, questions: Question[]) {
    this.id = id;
    this.titre = titre;
    this.questions = questions;
  }
}

export class Question {
  id: number;
  libelle: string;
  reponseQuestions: ReponseQuestion[];

  constructor(id: number, libelle: string, reponseQuestions: ReponseQuestion[]) {
    this.id = id;
    this.libelle = libelle;
    this.reponseQuestions = reponseQuestions;
  }
}

export class ReponseQuestion {
  id: number;
  contenu: string;
  question: { id: number }; // Assurez-vous que la propriété question est correctement typée

  constructor(id: number, contenu: string, question: { id: number }) {
    this.id = id;
    this.contenu = contenu;
    this.question = question;
  }
}

