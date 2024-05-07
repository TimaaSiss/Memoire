import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QuestionnaireService } from '../service/questionnaire-service.service';
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
    private questionnaireService: QuestionnaireService
  ) { }

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
