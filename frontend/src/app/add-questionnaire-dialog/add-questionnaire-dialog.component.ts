import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionnaireService } from '../services/questionnaire-service.service';
import { Questionnaire } from '../model/questionnaire';

@Component({
  selector: 'app-add-questionnaire-dialog',
  templateUrl: './add-questionnaire-dialog.component.html',
  styleUrls: ['./add-questionnaire-dialog.component.scss']
})
export class AddQuestionnaireDialogComponent implements OnInit {
  newQuestionnaire: Questionnaire = { id: 0, titre: '', questions: [] }; // Déclaration de newQuestionnaire

  @Output() questionnaireAdded: EventEmitter<Questionnaire> = new EventEmitter<Questionnaire>();

  constructor(
    public dialogRef: MatDialogRef<AddQuestionnaireDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Questionnaire, // Injecter les données du questionnaire
  
    private questionnaireService: QuestionnaireService
  ) {   this.newQuestionnaire = { ...data };
}

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.newQuestionnaire.titre.trim()) {
      this.questionnaireService.addQuestionnaire(this.newQuestionnaire).subscribe((newQuestionnaire) => {
        this.dialogRef.close(newQuestionnaire);
      });
    }
  }
}
