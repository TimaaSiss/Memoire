import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    public dialogRef: MatDialogRef<EditFormationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Formation,
    private etablissementService: EtablissementService
  ) {
    this.editedFormation = { ...data };
  }

  ngOnInit(): void {
    // Charger les établissements depuis le service
    this.etablissementService.getAllEtablissements().subscribe(data => {
      this.etablissements = data;
    });

    // Copier les données reçues pour les éditer
    this.editedFormation = { ...this.data };
  }

  onSubmit(): void {
    // Emettre les données éditées vers le composant parent
    this.dialogRef.close(this.editedFormation);
  }

  onCancelClick(): void {
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
