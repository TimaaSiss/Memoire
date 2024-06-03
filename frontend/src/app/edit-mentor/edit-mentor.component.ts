import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mentor } from '@app/model/mentor.model';

@Component({
  selector: 'app-edit-mentor',
  templateUrl: './edit-mentor.component.html',
  styleUrls: ['./edit-mentor.component.scss']
})
export class EditMentorComponent {
  editedMentor: Mentor;

  constructor(
    public dialogRef: MatDialogRef<EditMentorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mentor
  ) {
    // Cloner les données pour éviter la modification directe des données d'origine
    this.editedMentor = { ...data };
  }

  onSubmit(): void {
    // Émettre les données éditées pour les envoyer au composant parent
    this.dialogRef.close(this.editedMentor);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
