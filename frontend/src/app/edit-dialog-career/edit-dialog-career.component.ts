import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Carriere } from '../model/carriere.model';

@Component({
  selector: 'app-edit-carriere-dialog',
  templateUrl: './edit-dialog-career.component.html',
  styleUrls: ['./edit-dialog-career.component.scss']
})
export class EditCarriereDialogComponent implements OnInit {
  editedCarriere: Carriere = { id: 0, nom: '', description: '', secteur: '', competences_requises: '', salaire: '', image:'' };


  constructor(
    public dialogRef: MatDialogRef<EditCarriereDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Carriere
  ) { }

  ngOnInit(): void {
    // Copiez les données reçues pour les éditer
    this.editedCarriere.id = this.data.id;
    this.editedCarriere.nom = this.data.nom;
    this.editedCarriere.description = this.data.description;
    this.editedCarriere.secteur = this.data.secteur;
    this.editedCarriere.competences_requises = this.data.competences_requises;
    this.editedCarriere.salaire = this.data.salaire;
  }

  onSubmit(): void {
    console.log("Données éditées à envoyer au composant parent :", this.editedCarriere);
    // Émettez les données éditées pour les envoyer au composant parent
    this.dialogRef.close(this.editedCarriere);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
