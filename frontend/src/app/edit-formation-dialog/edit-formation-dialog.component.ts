import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Formation } from '@app/model/formation.model';

@Component({
  selector: 'app-edit-formation-dialog',
  templateUrl: './edit-formation-dialog.component.html',
  styleUrls: ['./edit-formation-dialog.component.scss']
})
export class EditFormationDialogComponent {
  editedFormation: Formation = { id: 0, titre: '', description: '', contenu: '', duree: '', prix: 0, etablissements:[]};


  constructor(
    public dialogRef: MatDialogRef<EditFormationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Formation
    
  ) {  this.editedFormation = { ...data };
}

  ngOnInit(): void {
    // Copiez les données reçues pour les éditer
    this.editedFormation.id = this.data.id;
    this.editedFormation.titre = this.data.titre;
    this.editedFormation.description = this.data.description;
    this.editedFormation.contenu = this.data.contenu;
    this.editedFormation.duree = this.data.duree;
    this.editedFormation.prix = this.data.prix;
  }

  onSubmit(): void {
    // Emit the edited data to the parent component
    this.dialogRef.close(this.editedFormation);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
