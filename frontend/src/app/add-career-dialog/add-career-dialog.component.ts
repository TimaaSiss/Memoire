import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carriere } from '@app/model/carriere.model';
import { Formation } from '@app/model/formation.model';
import { FormationService } from '@app/services/formations.service';
import { CarriereService } from '@app/services/carrieres.service';

@Component({
  selector: 'app-add-career-dialog',
  templateUrl: './add-career-dialog.component.html',
  styleUrls: ['./add-career-dialog.component.scss']
})
export class AddCareerDialogComponent implements OnInit {
  addCarriereForm!: FormGroup;
  formations: Formation[] = [];
  selectedFormationIds: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddCareerDialogComponent>,
    private formationService: FormationService,
    private carriereService: CarriereService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addCarriereForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      secteur: ['', Validators.required],
      competences_requises: ['', Validators.required],
      salaire: ['', Validators.required],
      image: ['', Validators.required],
      formations: [[]]  // Ajoutez ce champ pour les formations
    });

    this.loadFormations();
  }

  loadFormations(): void {
    this.formationService.getAllFormations().subscribe(
      (data: Formation[]) => {
        this.formations = data || []; // Assurez-vous que data est défini
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
    this.addCarriereForm.get('formations')?.setValue(this.selectedFormationIds);  // Mettez à jour le champ des formations
  }

  onSubmit(): void {
    if (this.addCarriereForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const newCarriere: Carriere = this.addCarriereForm.value;

    this.carriereService.addCarriere(newCarriere).subscribe(
      (response) => {
        console.log("Carrière ajoutée avec succès :", response);
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la carrière :', error);
      }
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
