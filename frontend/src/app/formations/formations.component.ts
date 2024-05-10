import { Component, OnInit } from '@angular/core';
import { FormationService } from '@app/services/formations.service';
import { MatDialog } from '@angular/material/dialog';
import { Formation } from '@app/model/formation.model';
import { AddFormationDialogComponent } from '@app/add-formation-dialog/add-formation-dialog.component';

@Component({
  selector: 'app-formation',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationComponent implements OnInit {
  formations: Formation[] = [];
  selectedFormation: Formation | null = null;
   newFormation: Formation = { titre: '', description: '', duree: '', prix: 0, contenu: '' }; // Ajoutez cette propriété pour représenter la nouvelle formation à ajouter

  constructor(private formationService: FormationService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.formationService.getAllFormations().subscribe(formations => {
      this.formations = formations;
    });
  }

  openAddFormationDialog(): void {
    const dialogRef = this.dialog.open(AddFormationDialogComponent, {
      width: '500px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addFormation(result);
      }
    });
  }
  //isFormation(object: any): object is Formation {
  // Vérifie si l'objet a les propriétés d'une Formation
  //return 'titre' in object && 'description' in object && 'duree' in object && 'prix' in object && 'contenu' in object;
//}


    addFormation(newFormation: Formation): void {
    this.formationService.addFormation(newFormation).subscribe(() => {
    this.loadFormations();
  });
}
  
 

  editFormation(formation: Formation): void {
    console.log("Formation à éditer :", formation);
    this.selectedFormation = formation;
  }

  updateFormation(): void {
    if (this.selectedFormation && this.selectedFormation.id !== undefined) {
      this.formationService.updateFormation(this.selectedFormation.id, this.selectedFormation)
        .subscribe(updatedFormation => {
          // Mettre à jour la formation dans la liste des formations
          const index = this.formations.findIndex(f => f.id === updatedFormation.id);
          if (index !== -1) {
            this.formations[index] = updatedFormation;
          }
          // Réinitialiser la formation sélectionnée
          this.selectedFormation = null;
        });
    }
  }
  confirmDeleteFormation(formation: Formation): void {
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer la formation "${formation.titre}" ?`);
    if (confirmDelete) {
      this.deleteFormation(formation);
    }
  }
  deleteFormation(formation: Formation): void {
    // Vérifier si l'ID de la formation est défini
    if (formation.id !== undefined) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
        this.formationService.deleteFormation(formation.id).subscribe(() => {
          this.loadFormations();
        });
      }
    } else {
      console.error('L\'ID de la formation est indéfini.');
    }
  }
  
}
