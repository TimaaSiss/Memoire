import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Etablissement } from '@app/model/etablissement.model';

@Component({
  selector: 'app-add-etablissement-dialog',
  templateUrl: './add-etablissement-dialog.component.html',
  styleUrls: ['./add-etablissement-dialog.component.scss']
})
export class AddEtablissementDialogComponent {
  newEtablissement: Etablissement = {
    id: 0,
    nom: '',
    lieu: '',
    telephone: '',
    email: ''
  };

  constructor(public dialogRef: MatDialogRef<AddEtablissementDialogComponent>) {}

  onSubmit(): void {
    this.dialogRef.close(this.newEtablissement);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}