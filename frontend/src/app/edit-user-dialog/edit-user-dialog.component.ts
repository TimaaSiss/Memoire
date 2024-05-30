import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { User } from '@app/model/user';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {
  editedUser: User;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    // Cloner les données pour éviter la modification directe des données d'origine
    this.editedUser = { ...data };
  }

  onSubmit(): void {
    // Émettre les données éditées pour les envoyer au composant parent
    this.dialogRef.close(this.editedUser);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}