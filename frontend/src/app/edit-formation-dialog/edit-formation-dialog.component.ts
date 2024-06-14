import { CarriereService } from '@app/services/carrieres.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Carriere } from '@app/model/carriere.model';
import { Etablissement } from '@app/model/etablissement.model';
import { Formation } from '@app/model/formation.model';
import { EtablissementService } from '@app/services/etablissement.service';

@Component({
  selector: 'app-edit-formation-dialog',
  templateUrl: './edit-formation-dialog.component.html',
  styleUrls: ['./edit-formation-dialog.component.scss']
})
export class EditFormationDialogComponent implements OnInit {
  editedFormation: Formation;
  etablissements: Etablissement[] = [];
  carrieres: Carriere[] = []; // Liste des carrières disponibles
  selectedCarrieres: number[] = []; // Carrières sélectionnées pour cette formation


  constructor(
    public dialogRef: MatDialogRef<EditFormationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Formation,
    private etablissementService: EtablissementService,
    private carriereService: CarriereService
  ) {
    this.editedFormation = { ...data };
  }

  ngOnInit(): void {
    // Charger les établissements depuis le service
    this.etablissementService.getAllEtablissements().subscribe(data => {
      this.etablissements = data;
    });

    this.loadCarrieres();
   

    // Copier les données reçues pour les éditer
    this.editedFormation = { ...this.data };
  }

  loadCarrieres(): void {
    // Exemple de chargement de carrières depuis un service (à adapter selon votre implémentation)
    this.carriereService.getAllCarrieres().subscribe(
      (data: Carriere[]) => {
        this.carrieres = data;
        // Charger les carrières déjà associées à cette formation
       // this.selectedCarrieres = this.editedFormation.carrieres.map(carriere => carriere.id);
      },
      (error: any) => {
        console.error('Error fetching carrieres:', error);
      }
    );
  }

  isSelectedCarriere(carriereId: number): boolean {
    return this.selectedCarrieres.includes(carriereId);
  }

  onCarriereSelectionChange(carriereId: number, event: any): void {
    if (event.target.checked) {
      // Ajoutez la carrière à la liste des carrières sélectionnées
      this.selectedCarrieres.push(carriereId);
    } else {
      // Retirez la carrière de la liste des carrières sélectionnées
      this.selectedCarrieres = this.selectedCarrieres.filter(id => id !== carriereId);
    }
  }

  onSubmit(): void {
    // Emettre les données éditées vers le composant parent
    this.dialogRef.close(this.editedFormation);
  }

  onCancelClick(): void {
     // Ajoutez les carrières sélectionnées à l'objet editedFormation
     this.editedFormation.carrieres = this.carrieres.filter(carriere => this.selectedCarrieres.includes(carriere.id));

    this.dialogRef.close();
  }

  onEtablissementSelectionChange(etablissement: Etablissement, event: any): void {
    if (event.target.checked) {
      this.editedFormation.etablissements.push(etablissement);
    } else {
      this.editedFormation.etablissements = this.editedFormation.etablissements.filter(e => e.id !== etablissement.id);
    }
  }

  isEtablissementSelected(etablissement: Etablissement): boolean {
    return this.editedFormation.etablissements.some(e => e.id === etablissement.id);
  }
}
