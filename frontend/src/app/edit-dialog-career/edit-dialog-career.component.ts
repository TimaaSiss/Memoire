import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Carriere } from '../model/carriere.model';
import { Formation } from '../model/formation.model'; // Assurez-vous d'importer le modèle de Formation si ce n'est pas déjà fait
import { FormationService } from '@app/services/formations.service';

@Component({
  selector: 'app-edit-carriere-dialog',
  templateUrl: './edit-dialog-career.component.html',
  styleUrls: ['./edit-dialog-career.component.scss']
})
export class EditCarriereDialogComponent implements OnInit {
  editedCarriere: Carriere = { id: 0, nom: '', description: '', secteur: '', competences_requises: '', salaire: '', image: '', formations: [] };
  formations: Formation[] = []; // Liste des formations disponibles
  selectedFormations: number[] = []; // Formations sélectionnées pour cette carrière

  constructor(
    public dialogRef: MatDialogRef<EditCarriereDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Carriere,
    private formationService: FormationService,
  ) { }

  ngOnInit(): void {
    // Copiez les données reçues pour les éditer
    this.editedCarriere.id = this.data.id;
    this.editedCarriere.nom = this.data.nom;
    this.editedCarriere.description = this.data.description;
    this.editedCarriere.secteur = this.data.secteur;
    this.editedCarriere.competences_requises = this.data.competences_requises;
    this.editedCarriere.salaire = this.data.salaire;
    this.editedCarriere.image = this.data.image;

    // Chargez les formations disponibles depuis votre service ou une source de données
    this.loadFormations(); 
    // Chargez les formations déjà associées à cette carrière
    this.selectedFormations = this.data.formations.map(formation => formation.id);
  }

  loadFormations(): void {
    // Exemple de chargement de formations depuis un service (à adapter selon votre implémentation)
    this.formationService.getAllFormations().subscribe(
      (data: Formation[]) => {
        this.formations = data;
      },
      (error: any) => {
        console.error('Error fetching formations:', error);
      }
    );
  }

  isSelectedFormation(formationId: number): boolean {
    return this.selectedFormations.includes(formationId);
  }

  onFormationSelectionChange(formationId: number, event: any): void {
    if (event.target.checked) {
      // Ajoutez la formation à la liste des formations sélectionnées
      this.selectedFormations.push(formationId);
    } else {
      // Retirez la formation de la liste des formations sélectionnées
      this.selectedFormations = this.selectedFormations.filter(id => id !== formationId);
    }
  }

  onSubmit(): void {
    // Ajoutez les formations sélectionnées à l'objet editedCarriere
    this.editedCarriere.formations = this.formations.filter(formation => this.selectedFormations.includes(formation.id));

    console.log("Données éditées à envoyer au composant parent :", this.editedCarriere);
    // Émettez les données éditées pour les envoyer au composant parent
    this.dialogRef.close(this.editedCarriere);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
