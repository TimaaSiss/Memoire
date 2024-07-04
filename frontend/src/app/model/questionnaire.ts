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
  hasOtherOption: boolean;
  questionnaire: Questionnaire; // Ajoutez une propriété pour le questionnaire parent

  constructor(id: number, libelle: string, reponseQuestions: ReponseQuestion[], hasOtherOption: boolean, questionnaire: Questionnaire) {
    this.id = id;
    this.libelle = libelle;
    this.reponseQuestions = reponseQuestions;
    this.hasOtherOption= hasOtherOption;
    this.questionnaire = questionnaire; // Initialisez la propriété questionnaire
 
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

