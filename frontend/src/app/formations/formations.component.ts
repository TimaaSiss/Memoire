import { Component, OnInit } from '@angular/core';
import { FormationService } from '@app/services/formations.service';
import { MatDialog } from '@angular/material/dialog';
import { Formation } from '@app/model/formation.model';
import { AddFormationDialogComponent } from '@app/add-formation-dialog/add-formation-dialog.component';
import { EditFormationDialogComponent } from '@app/edit-formation-dialog/edit-formation-dialog.component';

@Component({
  selector: 'app-formation',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationComponent implements OnInit {
  formations: Formation[] = [];
  selectedFormation: Formation | null = null;
   newFormation: Formation = { titre: '', description: '', duree: '', prix: 0, contenu: '', etablissements:[] }; // Ajoutez cette propriété pour représenter la nouvelle formation à ajouter
   menuOpen=true;
  constructor(private formationService: FormationService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadFormations();
    // Vérifier si la valeur de menuOpen est stockée localement
    const storedMenuOpen = localStorage.getItem('menuOpen');
    if (storedMenuOpen !== null) {
      // Si une valeur est trouvée dans le stockage local, la mettre à jour
      this.menuOpen = JSON.parse(storedMenuOpen);
    }
  }

  toggleMenu(): void {
    // Basculer l'état menuOpen
    this.menuOpen = !this.menuOpen;
    // Enregistrer l'état menuOpen dans le stockage du navigateur
    localStorage.setItem('menuOpen', JSON.stringify(this.menuOpen));
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

openEditDialog(formation: Formation): void {
  const dialogRef = this.dialog.open(EditFormationDialogComponent, {
    width: '500px',
    data: formation
  });

  dialogRef.afterClosed().subscribe(editedFormation => {
    if (editedFormation) {
      this.updateFormation(editedFormation); // Call updateFormation here
    }
  });
}


    addFormation(newFormation: Formation): void {
    this.formationService.addFormation(newFormation).subscribe(() => {
    this.loadFormations();
  });
}
  

updateFormation(updatedFormation: Formation): void {
  if (updatedFormation.id !== undefined) {
    this.formationService.updateFormation(updatedFormation.id, updatedFormation)
      .subscribe(() => {
        // Refresh the formation list after successful update
        this.loadFormations();
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
