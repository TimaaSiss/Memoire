// add-career-dialog.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Carriere } from '../model/carriere.model';

@Component({
  selector: 'app-add-career-dialog',
  templateUrl: './add-career-dialog.component.html',
  styleUrls: ['./add-career-dialog.component.scss']
})
export class AddCareerDialogComponent implements OnInit {
  newCarriere: Carriere = { id: 0, nom: '', description: '', secteur: '', competences_requises: '', salaire: '', image:''};

  constructor(
    public dialogRef: MatDialogRef<AddCareerDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.dialogRef.close(this.newCarriere);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
