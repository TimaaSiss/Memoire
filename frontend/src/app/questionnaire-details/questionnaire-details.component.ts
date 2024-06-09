import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from '@app/services/questionnaire-service.service';
import { ReponseUserService } from '@app/services/reponse-user.service';
import { Questionnaire, Question } from '../model/questionnaire';
import { ReponseUser } from '@app/model/reponse-user.model';
import { User } from '@app/model/user';

@Component({
  selector: 'app-questionnaire-details',
  templateUrl: './questionnaire-details.component.html',
  styleUrls: ['./questionnaire-details.component.scss']
})
export class QuestionnaireDetailsComponent implements OnInit {
  questionnaires: Questionnaire[] = [];
  currentQuestionnaireIndex: number = 0;
  currentQuestionnaire: Questionnaire | undefined;
  errorMessage: string | undefined;
  warningMessage: string | undefined;

  selectedAnswers: { [questionId: number]: string } = {};
  otherAnswers: { [questionId: number]: string } = {};

  currentUser!: User;
  progress: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private reponseUserService: ReponseUserService
  ) {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      this.currentUser = JSON.parse(currentUserString);
    }
  }

  ngOnInit(): void {
    this.loadUnansweredQuestionnaires();
    this.otherAnswers;
  }

  loadUnansweredQuestionnaires(): void {
    if (this.currentUser && this.currentUser.id) {
      this.questionnaireService.getUnansweredQuestionnaires(this.currentUser.id).subscribe(
        (data: Questionnaire[]) => {
          this.questionnaires = data;
          if (this.questionnaires.length > 0) {
            this.currentQuestionnaire = this.questionnaires[this.currentQuestionnaireIndex];
            this.warningMessage = undefined;
            this.resumeFromLastAnsweredQuestion();
          } else {
            this.currentQuestionnaire = undefined;
            this.errorMessage = 'No more questionnaires available';
            this.redirectToProfile();
          }
        },
        (error) => {
          this.errorMessage = 'Error loading questionnaires';
          console.error('Error fetching questionnaires', error);
        }
      );
    }
  }

  saveCurrentQuestionnaireIndex(): void {
    if (this.currentUser) {
      const indexKey = `currentQuestionnaireIndex_${this.currentUser.id}`;
      localStorage.setItem(indexKey, this.currentQuestionnaireIndex.toString());
    }
  }

  loadCurrentQuestionnaireIndex(): void {
    if (this.currentUser) {
      const indexKey = `currentQuestionnaireIndex_${this.currentUser.id}`;
      const savedIndex = localStorage.getItem(indexKey);
      if (savedIndex !== null) {
        this.currentQuestionnaireIndex = parseInt(savedIndex, 10);
      }
    }
  }

  resumeFromLastAnsweredQuestion(): void {
    if (!this.currentQuestionnaire) return;

    for (const question of this.currentQuestionnaire.questions) {
      if (!this.selectedAnswers[question.id] && !this.otherAnswers[question.id]) {
        this.scrollToQuestion(question.id);
        break;
      }
    }
  }

  scrollToQuestion(questionId: number): void {
    setTimeout(() => {
      const questionElement = document.getElementById(`question-${questionId}`);
      if (questionElement) {
        questionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }

  validateOtherAnswer(questionId: number): void {
    const otherAnswer = this.otherAnswers[questionId];
    if (otherAnswer) {
      this.selectedAnswers[questionId] = '';
      this.otherAnswers[questionId] = otherAnswer;
      alert('Votre réponse a été enregistrée.');
    } else {
      alert('Veuillez entrer une réponse.');
    }
  }

  onAnswerSelect(questionId: number, answer: string): void {
    this.selectedAnswers[questionId] = answer;
    if (answer === 'Autre (spécifiez) ______________') {
      this.otherAnswers[questionId] = '';
    } else {
      delete this.otherAnswers[questionId];
    }
    this.storePartialAnswers();
  }

  storePartialAnswers(): void {
    if (!this.currentUser || !this.currentQuestionnaire) return;
    const partialAnswersKey = `partialAnswers_${this.currentUser.id}_${this.currentQuestionnaire.id}`;
    const partialAnswers = {
      selectedAnswers: this.selectedAnswers,
      otherAnswers: this.otherAnswers
    };
    localStorage.setItem(partialAnswersKey, JSON.stringify(partialAnswers));
  }

  loadPartialAnswers(): void {
    if (!this.currentUser || !this.currentQuestionnaire) return;
    const partialAnswersKey = `partialAnswers_${this.currentUser.id}_${this.currentQuestionnaire.id}`;
    const partialAnswersString = localStorage.getItem(partialAnswersKey);
    if (partialAnswersString) {
      const partialAnswers = JSON.parse(partialAnswersString);
      this.selectedAnswers = partialAnswers.selectedAnswers || {};
      this.otherAnswers = partialAnswers.otherAnswers || {}; // Assurez-vous que les réponses textuelles sont correctement récupérées ici
    }
  }

  completeCurrentQuestionnaire(): void {
    if (!this.allQuestionsAnswered()) {
      this.warningMessage = 'Veuillez répondre à toutes les questions avant de valider le questionnaire.';
      return;
    }
  
    // Enregistrer toutes les réponses dans la base de données
    this.saveUserResponses();
  
    // Mettre à jour la progression
    this.updateProgress();
  
    // Mettre à jour le nombre de questionnaires auxquels l'utilisateur a répondu
    if (this.currentUser) {
      if (this.currentUser.answeredQuestionnaires !== undefined) {
        this.currentUser.answeredQuestionnaires++;
      } else {
        this.currentUser.answeredQuestionnaires = 1;
      }
    }
  
    // Charger le prochain questionnaire ou rediriger vers le profil si aucun questionnaire restant
    this.currentQuestionnaireIndex++;
    this.saveCurrentQuestionnaireIndex();
    this.loadNextQuestionnaire();
  
    // Mettre à jour les informations de l'utilisateur dans le stockage local
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }
  loadNextQuestionnaire(): void {
    if (this.currentQuestionnaireIndex < this.questionnaires.length) {
      this.currentQuestionnaire = this.questionnaires[this.currentQuestionnaireIndex];
      this.loadPartialAnswers();
      this.resumeFromLastAnsweredQuestion();
    } else {
      this.currentQuestionnaire = undefined;
      this.errorMessage = 'No more questionnaires available';
      this.redirectToProfile();
    }
  }

  updateProgress(): void {
    const answeredQuestionnaires = this.currentUser.answeredQuestionnaires || 0;
    const totalQuestionnaires = this.questionnaires.length;
    this.progress = (answeredQuestionnaires / totalQuestionnaires) * 100;
  }

  allQuestionsAnswered(): boolean {
    if (!this.currentQuestionnaire) return false;
    for (const question of this.currentQuestionnaire.questions) {
      if (!this.selectedAnswers[question.id] && !this.otherAnswers[question.id]) {
        return false;
      }
    }
    return true;
  }

  saveUserResponses(): void {
    if (this.currentQuestionnaire) {
      for (const question of this.currentQuestionnaire.questions) {
        let reponseUser: ReponseUser;
  
        if (this.selectedAnswers[question.id] === 'Autre (spécifiez) ______________') {
          // Si l'utilisateur a choisi "Autre (spécifiez) ______________", enregistrer la réponse textuelle
          reponseUser = {
            reponseTextuelle: this.otherAnswers[question.id] || '', // Utiliser la réponse textuelle si elle est définie
            reponseChoisie: '', // Laisser la réponse choisie vide
            date: new Date(),
            user: this.currentUser,
            question: { id: question.id } as Question
          };
        } else {
          // Sinon, enregistrer la réponse choisie
          reponseUser = {
            reponseTextuelle: '',
            reponseChoisie: this.selectedAnswers[question.id] || '',
            date: new Date(),
            user: this.currentUser,
            question: { id: question.id } as Question
          };
        }
  
        console.log('Saving response for question:', question.id);
        console.log('Response textuelle:', reponseUser.reponseTextuelle);
        console.log('Response choisie:', reponseUser.reponseChoisie);
  
        this.reponseUserService.save(reponseUser).subscribe(
          response => {
            console.log('Réponse enregistrée avec succès :', response);
          },
          error => {
            console.error('Erreur lors de l\'enregistrement de la réponse :', error);
          }
        );
      }
      this.clearPartialAnswers();
    }
}


  
 
  

  clearPartialAnswers(): void {
    if (!this.currentUser || !this.currentQuestionnaire) return;
    const partialAnswersKey = `partialAnswers_${this.currentUser.id}_${this.currentQuestionnaire.id}`;
    localStorage.removeItem(partialAnswersKey);
  }

  redirectToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
