import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Carriere } from '../model/carriere.model';
import { Formation } from '../model/formation.model';
import { FormationService } from '@app/services/formations.service';

@Component({
  selector: 'app-add-career-dialog',
  templateUrl: './add-career-dialog.component.html',
  styleUrls: ['./add-career-dialog.component.scss']
})
export class AddCareerDialogComponent implements OnInit {
  addCarriereForm!: FormGroup; // Déclarer un FormGroup pour le formulaire réactif
  newCarriere: Carriere = { id: 0, nom: '', description: '', secteur: '', competences_requises: '', salaire: '', image: '', formations: [] };
  formations: Formation[] = [];
  selectedFormationIds: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddCareerDialogComponent>,
    private formationService: FormationService,
    private formBuilder: FormBuilder // Injecter le FormBuilder pour construire le formulaire
  ) { }

  ngOnInit(): void {
    this.addCarriereForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      secteur: ['', Validators.required],
      competences_requises: ['', Validators.required],
      salaire: ['', Validators.required],
      image: ['', Validators.required]
    });

    this.formationService.getAllFormations().subscribe(data => {
      this.formations = data;
    });
  }

  onFormationSelectionChange(formationId: number | undefined, event: any): void {
    if (formationId === undefined) {
      return;
    }

    if (event.target.checked) {
      this.selectedFormationIds.push(formationId);
    } else {
      const index = this.selectedFormationIds.indexOf(formationId);
      if (index > -1) {
        this.selectedFormationIds.splice(index, 1);
      }
    }
  }

  onSubmit(): void {
    if (this.addCarriereForm.invalid) {
      // Afficher un message d'erreur si le formulaire est invalide
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.newCarriere = {
      ...this.addCarriereForm.value,
      formations: this.formations.filter(formation =>
        formation.id !== undefined && this.selectedFormationIds.includes(formation.id)
      )
    };

    this.dialogRef.close(this.newCarriere);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
