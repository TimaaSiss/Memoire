import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Etablissement } from '@app/model/etablissement.model';
import { Formation } from '@app/model/formation.model';
import { FormationService } from '@app/services/formations.service';
import { EtablissementService } from '@app/services/etablissement.service';

@Component({
  selector: 'app-edit-etab-dialog',
  templateUrl: './edit-etab-dialog.component.html',
  styleUrls: ['./edit-etab-dialog.component.scss']
})
export class EditEtabDialogComponent implements OnInit {
  editEtablissementForm!: FormGroup;
  formations: Formation[] = [];
  selectedFormationIds: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditEtabDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Etablissement,
    private formationService: FormationService,
    private etablissementService: EtablissementService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editEtablissementForm = this.formBuilder.group({
      nom: [this.data.nom, Validators.required],
      sigle: [this.data.code_libelle, Validators.required],
      lieu: [this.data.lieu, Validators.required],
      telephone: [this.data.telephone, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]]
    });

    this.loadFormations();
   // this.selectedFormationIds = this.data.formations.map(f => f.id);
  }

  loadFormations(): void {
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

  isFormationSelected(formation: Formation): boolean {
    return this.selectedFormationIds.includes(formation.id);
  }

  onSubmit(): void {
    if (this.editEtablissementForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const updatedEtablissement: Etablissement = {
      ...this.data,
      ...this.editEtablissementForm.value,
      formations: this.formations.filter(formation =>
        formation.id !== undefined && this.selectedFormationIds.includes(formation.id)
      )
    };

    this.etablissementService.updateEtablissement(updatedEtablissement.id, updatedEtablissement)
      .subscribe(updatedEtablissement => {
        this.dialogRef.close(updatedEtablissement);
      }, error => {
        console.error('Error updating etablissement', error);
      });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
