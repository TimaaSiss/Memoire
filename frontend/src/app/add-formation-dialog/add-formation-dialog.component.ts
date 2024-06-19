import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Formation } from '@app/model/formation.model';
import { Etablissement } from '@app/model/etablissement.model';
import { EtablissementService } from '@app/services/etablissement.service';
import { Carriere } from '@app/model/carriere.model';
import { CarriereService } from '@app/services/carrieres.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-formation-dialog',
  templateUrl: './add-formation-dialog.component.html',
  styleUrls: ['./add-formation-dialog.component.scss']
})
export class AddFormationDialogComponent implements OnInit {
  addFormationForm!: FormGroup; // Déclarer un FormGroup pour le formulaire réactif

  newFormation: Formation = {
    id: 0,
    titre: '',
    description: '',
    duree: '',
    prix: 0,
    contenu: '',
    image: '',
    etablissements: [],
    carrieres: [],
    courses:[]
  };
  etablissements: Etablissement[] = [];
  selectedEtablissementIds: number[] = []; // Ajoutez cette ligne
  carrieres: Carriere[] = []; // Liste des carrières disponibles
  selectedCarrieres: number[] = []; // Carrières sélectionnées pour cette formation

  constructor(
    public dialogRef: MatDialogRef<AddFormationDialogComponent>,
    private etablissementService: EtablissementService,
    private carriereService: CarriereService,
    private formBuilder: FormBuilder // Injecter le FormBuilder pour construire le formulaire
  ) {}

  ngOnInit(): void {
    this.addFormationForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      duree: ['', Validators.required],
      prix: ['', Validators.required],
      contenu: ['', Validators.required],
      image: ['', Validators.required]
    });

    this.loadEtablissements();
    this.loadCarrieres();
  }

  loadCarrieres(): void {
    // Exemple de chargement de carrières depuis un service (à adapter selon votre implémentation)
    this.carriereService.getAllCarrieres().subscribe(
      (data: Carriere[]) => {
        this.carrieres = data;
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
    if (this.addFormationForm.invalid) {
      // Afficher un message d'erreur si le formulaire est invalide
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.newFormation.etablissements = this.etablissements.filter(etab =>
      this.selectedEtablissementIds.includes(etab.id)
    );
    this.newFormation.carrieres = this.carrieres.filter(carriere =>
      this.selectedCarrieres.includes(carriere.id)
    );

    console.log("Données à envoyer au composant parent :", this.newFormation);
    // Émettez les données pour les envoyer au composant parent
    this.dialogRef.close(this.newFormation);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
