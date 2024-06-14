import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Etablissement } from '@app/model/etablissement.model';
import { Formation } from '@app/model/formation.model';
import { FormationService } from '@app/services/formations.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-etablissement-dialog',
  templateUrl: './add-etablissement-dialog.component.html',
  styleUrls: ['./add-etablissement-dialog.component.scss']
})
export class AddEtablissementDialogComponent implements OnInit {
  addEtablissementForm!: FormGroup;

  newEtablissement: Etablissement = {
    id: 0,
    nom: '',
    code_libelle:'',
    lieu: '',
    telephone: '',
    email: '',
    formations: [] // Ajoutez cette ligne pour les formations
  };

  formations: Formation[] = [];
  selectedFormationIds: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddEtablissementDialogComponent>,
    private formationService: FormationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addEtablissementForm = this.formBuilder.group({
      nom: ['', Validators.required],
      code_libelle: ['', Validators.required],
      lieu: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loadFormations();
  }

  loadFormations(): void {
    this.formationService.getAllFormations().subscribe(data => {
      this.formations = data;
    });
  }

  onFormationSelectionChange(formationId: number, event: any): void {
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
    if (this.addEtablissementForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.newEtablissement.formations = this.formations.filter(formation =>
      this.selectedFormationIds.includes(formation.id)
    );
    this.dialogRef.close(this.newEtablissement);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
