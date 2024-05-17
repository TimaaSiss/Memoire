import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Questionnaire } from '../model/questionnaire'; 
import { QuestionnaireService } from '@app/services/questionnaire-service.service';
import { AddQuestionnaireDialogComponent } from '../add-questionnaire-dialog/add-questionnaire-dialog.component';
import { map } from 'rxjs/operators'; // Ajout de l'import pour map
import { ReponseQuestionService } from '@app/services/reponse-questions.service'; // Importation du service ReponseQuestionService
import { Question } from '../model/questionnaire'; // Importation du modèle Question
import { ReponseQuestion } from '../model/questionnaire';
import { AddResponseDialogComponent } from '@app/add-response-dialog/add-response-dialog.component';
@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss']
})
export class QuestionnairesComponent implements OnInit {
  questionnaireAdded: EventEmitter<Questionnaire> = new EventEmitter<Questionnaire>();
  questionnaires: Questionnaire[] = [];
  newQuestionnaire: Questionnaire = { id: 0, titre: '', questions: [] };
  selectedQuestionnaireId: number = 0;
  questionsMap: Map<number, Question[]> = new Map<number, Question[]>();
  selectedQuestionnaire: Questionnaire | null = null; // Ajout de la variable selectedQuestionnaire
  menuOpen= true;

  constructor(
    private questionnaireService: QuestionnaireService,
    private dialog: MatDialog,
    private reponseQuestionService: ReponseQuestionService // Injection du service ReponseQuestionService
  ) { }

  ngOnInit(): void {
    this.loadQuestionnaires();
    // Vérifier si la valeur de menuOpen est stockée localement
    const storedMenuOpen = localStorage.getItem('menuOpen');
    if (storedMenuOpen !== null) {
      // Si une valeur est trouvée dans le stockage local, la mettre à jour
      this.menuOpen = JSON.parse(storedMenuOpen);
    }
  }

  toggleMenu(): void {
    // Basculer l'état menuOpen
    this.menuOpen = !this.menuOpen;
    // Enregistrer l'état menuOpen dans le stockage du navigateur
    localStorage.setItem('menuOpen', JSON.stringify(this.menuOpen));
  }

  loadQuestionnaires() {
    this.questionnaireService.getAllQuestionnaires().subscribe(data => {
      this.questionnaires = data;
    });
  }

  loadQuestions(questionnaireId: number): void {
    this.questionnaireService.getQuestionsByQuestionnaireId(questionnaireId)
      .pipe(
        map(data => data ? Object.values(data.questions) : [])
      )
      .subscribe(questions => {
        console.log("Questions loaded:", questions);
        this.questionsMap.set(questionnaireId, questions);
      });
  }
  
  showQuestions(questionnaireId: number): void {
    if (this.selectedQuestionnaireId !== null) {
      this.selectedQuestionnaireId = questionnaireId;
      console.log("Selected questionnaire ID:", this.selectedQuestionnaireId);
      this.loadQuestions(this.selectedQuestionnaireId);
    }
  }

  showResponses(questionId: number): void {
    if (this.selectedQuestionnaireId !== null) {
      this.loadResponsesForQuestion(questionId);
    }
  }
  
  loadResponsesForQuestion(questionId: number): void {

    const questions = this.questionsMap.get(this.selectedQuestionnaireId);
  if (questions) {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      this.reponseQuestionService.getResponsesByQuestionId(questionId).subscribe(responses => {
        question.reponseQuestions = responses;
      });
    }
  }
    //if (this.selectedQuestionnaireId !== null) {
     // this.reponseQuestionService.getResponsesByQuestionId(questionId).subscribe(responses => {
       // const questions = this.questionsMap.get(this.selectedQuestionnaireId);
        //if (questions) {
          //const questionIndex = questions.findIndex(q => q.id === questionId);
          //if (questionIndex !== -1) {
            //if (!questions[questionIndex].reponseQuestions) {
              //questions[questionIndex].reponseQuestions = [];
            //}
            // Ajouter les réponses un par un à la liste reponseQuestions
           // for (const response of responses) {
            //  questions[questionIndex].reponseQuestions.push(response);
          //  }
            //this.questionsMap.set(this.selectedQuestionnaireId, questions);
          //}
        //}});}
      }
  
  addQuestionnaire() {
    if (this.newQuestionnaire.titre.trim()) {
      this.questionnaireService.addQuestionnaire(this.newQuestionnaire).subscribe(() => {
        this.newQuestionnaire = { id: 0, titre: '', questions: [] };
        this.loadQuestionnaires();
      });
    }
  }

  openAddQuestionnaireDialog(): void {
    const dialogRef = this.dialog.open(AddQuestionnaireDialogComponent, {
      width: '400px',
      disableClose: true,
      data: this.addQuestionnaire
    });
  
    dialogRef.afterClosed().subscribe((result: Questionnaire) => {
      if (result) {
        this.questionnaires.push(result);
      }
    });
  }

  editQuestionnaire(questionnaire: Questionnaire) {
    this.selectedQuestionnaire = { ...questionnaire };
    const dialogRef = this.dialog.open(AddQuestionnaireDialogComponent, {
      width: '400px',
      disableClose: true,
      data: this.selectedQuestionnaire
    });

    dialogRef.afterClosed().subscribe((result: Questionnaire) => {
      if (result) {
        const index = this.questionnaires.findIndex(q => q.id === result.id);
        if (index !== -1) {
          this.questionnaires[index] = result;
        }
      }
      this.selectedQuestionnaire = null;
    });
  }

  updateQuestionnaire() {
    if (this.selectedQuestionnaire) {
      this.questionnaireService.updateQuestionnaire(this.selectedQuestionnaire.id, this.selectedQuestionnaire).subscribe(() => {
        this.selectedQuestionnaire = null;
        this.loadQuestionnaires();
      });
    }
  }

  confirmDeleteQuestionnaire(questionnaire: Questionnaire) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce questionnaire?")) {
      this.deleteQuestionnaire(questionnaire);
    }
  }

  deleteQuestionnaire(questionnaire: Questionnaire) {
    this.questionnaireService.deleteQuestionnaire(questionnaire.id).subscribe(() => {
      this.loadQuestionnaires();
    });
  }

  addResponse(question: Question, questionId: number) {
    const dialogRef = this.dialog.open(AddResponseDialogComponent, {
        width: '400px',
        data: { question: question }
    });
  
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            const newResponse: ReponseQuestion = {
                id: result,
                contenu: result,
                question: { id: questionId } // Associer l'ID de la question à la réponse
            };
  
            this.reponseQuestionService.addReponse(newResponse).subscribe(newResponse => {
                question.reponseQuestions.push(newResponse);
            });
        }
    });
  }
  



}

