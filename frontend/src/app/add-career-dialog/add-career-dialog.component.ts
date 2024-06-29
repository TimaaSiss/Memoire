import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carriere } from '@app/model/carriere.model';
import { Formation } from '@app/model/formation.model';
import { FormationService } from '@app/services/formations.service';

@Component({
  selector: 'app-add-career-dialog',
  templateUrl: './add-career-dialog.component.html',
  styleUrls: ['./add-career-dialog.component.scss']
})
export class AddCareerDialogComponent implements OnInit {
  addCarriereForm!: FormGroup;
  newCarriere!: Carriere; // Remove the initialization here
  formations: Formation[] = [];
  selectedFormationIds: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddCareerDialogComponent>,
    private formationService: FormationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addCarriereForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      secteur: ['', Validators.required],
      competences_requises: ['', Validators.required],
      salaire: ['', Validators.required],
      image: ['', Validators.required]
    });

    this.loadFormations();
  }

  loadFormations(): void {
    this.formationService.getAllFormations().subscribe(
      (data: Formation[]) => {
        this.formations = data;
      },
      (error: any) => {
        console.error('Error fetching formations:', error);
      }
    );
  }

  onFormationSelectionChange(formationId: number, event: any): void {
    if (event.target.checked) {
      this.selectedFormationIds.push(formationId);
    } else {
      this.selectedFormationIds = this.selectedFormationIds.filter(id => id !== formationId);
    }
  }

  onSubmit(): void {
    if (this.addCarriereForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.newCarriere = this.addCarriereForm.value; // Assign form values to newCarriere

    // Assign selected formations
    this.newCarriere.formations = this.formations.filter(formation =>
      this.selectedFormationIds.includes(formation.id)
    );

    console.log("Données à envoyer au composant parent :", this.newCarriere);
    this.dialogRef.close(this.newCarriere);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
