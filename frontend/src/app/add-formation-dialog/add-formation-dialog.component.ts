import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Formation } from '@app/model/formation.model';
@Component({
  selector: 'app-add-formation-dialog',
  templateUrl: './add-formation-dialog.component.html',
  styleUrls: ['./add-formation-dialog.component.scss']
})
export class AddFormationDialogComponent {
  newFormation: Formation = {
    id: 0,
    titre: '',
    description: '',
    duree: '',
    prix: 0,
    contenu: ''
  };

  constructor(public dialogRef: MatDialogRef<AddFormationDialogComponent>) {}

  onSubmit(): void {
    this.dialogRef.close(this.newFormation);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}