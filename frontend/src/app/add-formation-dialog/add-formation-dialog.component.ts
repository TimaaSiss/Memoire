import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Formation } from '@app/model/formation.model';
import { Etablissement } from '@app/model/etablissement.model';
import { EtablissementService } from '@app/services/etablissement.service';

@Component({
  selector: 'app-add-formation-dialog',
  templateUrl: './add-formation-dialog.component.html',
  styleUrls: ['./add-formation-dialog.component.scss']
})
export class AddFormationDialogComponent implements OnInit {
  newFormation: Formation = {
    id: 0,
    titre: '',
    description: '',
    duree: '',
    prix: 0,
    contenu: '',
    image: '',
    etablissements: []
  };

  etablissements: Etablissement[] = [];
  selectedEtablissementIds: number[] = []; // Ajoutez cette ligne

  constructor(
    public dialogRef: MatDialogRef<AddFormationDialogComponent>,
    private etablissementService: EtablissementService
  ) {}

  ngOnInit(): void {
    this.loadEtablissements();
  }

  loadEtablissements(): void {
    this.etablissementService.getAllEtablissements().subscribe(data => {
      this.etablissements = data;
    });
  }

  onEtablissementSelectionChange(etablissementId: number, event: any): void {
    if (event.target.checked) {
      this.selectedEtablissementIds.push(etablissementId);
    } else {
      const index = this.selectedEtablissementIds.indexOf(etablissementId);
      if (index > -1) {
        this.selectedEtablissementIds.splice(index, 1);
      }
    }
  }

  onSubmit(): void {
    this.newFormation.etablissements = this.etablissements.filter(etab =>
      this.selectedEtablissementIds.includes(etab.id)
    );
    this.dialogRef.close(this.newFormation);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
