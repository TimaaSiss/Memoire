import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Etablissement } from '@app/model/etablissement.model';

@Component({
  selector: 'app-edit-etab-dialog',
  templateUrl: './edit-etab-dialog.component.html',
  styleUrls: ['./edit-etab-dialog.component.scss']
})
export class EditEtabDialogComponent {
  editedEtablissement: Etablissement;

  constructor(
    public dialogRef: MatDialogRef<EditEtabDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Etablissement
  ) {
    // Cloner les données pour éviter la modification directe des données d'origine
    this.editedEtablissement = { ...data };
  }

  onSubmit(): void {
    // Émettre les données éditées pour les envoyer au composant parent
    this.dialogRef.close(this.editedEtablissement);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
