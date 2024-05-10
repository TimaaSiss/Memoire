import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Questionnaire } from '../model/questionnaire'; 
import { QuestionnaireService } from '@app/services/questionnaire-service.service';
import { AddQuestionnaireDialogComponent } from '../add-questionnaire-dialog/add-questionnaire-dialog.component';
import { EventEmitter } from '@angular/core';
import { Question } from '../model/questionnaire';
import { map } from 'rxjs';
import { ReponseQuestionService } from '@app/services/reponse-questions.service';
@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss']
})
export class QuestionnairesComponent implements OnInit {
  

  questionnaireAdded: EventEmitter<Questionnaire> = new EventEmitter<Questionnaire>();


  questionnaires: Questionnaire[] = [];
  newQuestionnaire: Questionnaire = { id: 0, titre: '', questions: [] }; // Déclaration de la propriété newQuestionnaire
  selectedQuestionnaire: Questionnaire | null = null;
  selectedQuestionnaireId: number | null = null;
  questionsMap: Map<number, Question[]> = new Map<number, Question[]>();

  constructor(private questionnaireService: QuestionnaireService, private dialog: MatDialog, private reponseQuestionService: ReponseQuestionService) { }

  ngOnInit() {
    this.loadQuestionnaires();
  }

  loadQuestionnaires() {
    this.questionnaireService.getAllQuestionnaires().subscribe(data => {
      this.questionnaires = data;
    });
  }

  loadQuestions(questionnaireId: number): void {
    this.questionnaireService.getQuestionsByQuestionnaireId(questionnaireId)
      .pipe(
        map(data => data ? Object.values(data.questions) : []) // Filtrer les éléments null
      )
      .subscribe(questions => {
        console.log("Questions loaded:", questions);
        this.questionsMap.set(questionnaireId, questions);
      });
  }
  
  // Méthode pour afficher les questions associées à un questionnaire spécifique
  showQuestions(questionnaireId: number): void {
    this.selectedQuestionnaireId = questionnaireId;
    console.log("Selected questionnaire ID:", this.selectedQuestionnaireId); // Ajouter ce log
      this.loadQuestions(this.selectedQuestionnaireId);
  }
  showResponses(questionId: number): void {
    this.reponseQuestionService.getResponsesByQuestionId(questionId)
      .subscribe(responses => {
        console.log("Réponses chargées :", responses);
        // Gérer les réponses chargées ici (par exemple, les afficher dans une boîte de dialogue)
      });
  }
  addQuestionnaire() {
    // Vérifiez si le titre du questionnaire est valide
    if (this.newQuestionnaire.titre.trim()) {
      // Envoyez la demande d'ajout du questionnaire
      this.questionnaireService.addQuestionnaire(this.newQuestionnaire).subscribe(() => {
        // Réinitialisez le nouveau questionnaire après l'ajout réussi
        this.newQuestionnaire = { id: 0, titre: '', questions: [] };
        // Rechargez la liste des questionnaires pour refléter les modifications
        this.loadQuestionnaires();
      });
    }
  }


  openAddQuestionnaireDialog(): void {
    const dialogRef = this.dialog.open(AddQuestionnaireDialogComponent, {
      width: '400px',
      disableClose: true,
      data: this.addQuestionnaire // Passer newQuestionnaire à la boîte de dialogue
    });
  
    dialogRef.afterClosed().subscribe((result: Questionnaire) => {
      if (result) {
        this.questionnaires.push(result); // Ajouter le nouveau questionnaire à la liste
      }
    });
  }

  editQuestionnaire(questionnaire: Questionnaire) {
    this.selectedQuestionnaire = { ...questionnaire }; // Cloner le questionnaire sélectionné pour éviter les modifications directes
    const dialogRef = this.dialog.open(AddQuestionnaireDialogComponent, {
      width: '400px',
      disableClose: true,
      data: this.selectedQuestionnaire // Passer le questionnaire sélectionné à la boîte de dialogue
    });

    dialogRef.afterClosed().subscribe((result: Questionnaire) => {
      if (result) {
        // Mettre à jour le questionnaire dans la liste
        const index = this.questionnaires.findIndex(q => q.id === result.id);
        if (index !== -1) {
          this.questionnaires[index] = result;
        }
      }
      this.selectedQuestionnaire = null; // Réinitialiser le questionnaire sélectionné
    });
  }


  

  updateQuestionnaire() {
    if (this.selectedQuestionnaire) {
      // Envoyez la demande de mise à jour du questionnaire
      this.questionnaireService.updateQuestionnaire(this.selectedQuestionnaire.id, this.selectedQuestionnaire).subscribe(() => {
        // Réinitialisez la sélection après la mise à jour réussie
        this.selectedQuestionnaire = null;
        // Rechargez la liste des questionnaires pour refléter les modifications
        this.loadQuestionnaires();
      });
    }
  }

  confirmDeleteQuestionnaire(questionnaire: Questionnaire) {
    // Demander confirmation avant la suppression du questionnaire
    if (confirm("Êtes-vous sûr de vouloir supprimer ce questionnaire?")) {
      this.deleteQuestionnaire(questionnaire);
    }
  }

  deleteQuestionnaire(questionnaire: Questionnaire) {
    // Envoyez la demande de suppression du questionnaire
    this.questionnaireService.deleteQuestionnaire(questionnaire.id).subscribe(() => {
      // Rechargez la liste des questionnaires après la suppression réussie
      this.loadQuestionnaires();
    });
  }
}
