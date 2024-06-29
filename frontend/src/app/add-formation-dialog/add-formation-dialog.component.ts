import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formation } from '@app/model/formation.model';
import { Etablissement } from '@app/model/etablissement.model';
import { Carriere } from '@app/model/carriere.model';
import { EtablissementService } from '@app/services/etablissement.service';
import { CarriereService } from '@app/services/carrieres.service';

@Component({
  selector: 'app-add-formation-dialog',
  templateUrl: './add-formation-dialog.component.html',
  styleUrls: ['./add-formation-dialog.component.scss']
})
export class AddFormationDialogComponent implements OnInit {
  addFormationForm!: FormGroup;
  newFormation!: Formation; // Remove the initialization here
  etablissements: Etablissement[] = [];
  selectedEtablissementIds: number[] = [];
  carrieres: Carriere[] = [];
  selectedCarrieres: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddFormationDialogComponent>,
    private etablissementService: EtablissementService,
    private carriereService: CarriereService,
    private formBuilder: FormBuilder
  ) {
    
  }

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
    this.carriereService.getAllCarrieres().subscribe(
      (data: Carriere[]) => {
        this.carrieres = data;
      },
      (error: any) => {
        console.error('Error fetching carrieres:', error);
      }
    );
  }

  onCarriereSelectionChange(carriereId: number, event: any): void {
    if (event.target.checked) {
      this.selectedCarrieres.push(carriereId);
    } else {
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
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.newFormation = this.addFormationForm.value; // Assign form values to newFormation

    // Assign selected etablissements and carrieres
    this.newFormation.etablissements = this.etablissements.filter(etab =>
      this.selectedEtablissementIds.includes(etab.id)
    );
    this.newFormation.carrieres = this.carrieres.filter(carriere =>
      this.selectedCarrieres.includes(carriere.id)
    );

    console.log("Données à envoyer au composant parent :", this.newFormation);
    this.dialogRef.close(this.newFormation);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
