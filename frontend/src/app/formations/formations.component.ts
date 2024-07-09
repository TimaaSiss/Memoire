import { Component, OnInit, ViewChild } from '@angular/core';
import { FormationService } from '@app/services/formations.service';
import { MatDialog } from '@angular/material/dialog';
import { Formation } from '@app/model/formation.model';
import { AddFormationDialogComponent } from '@app/add-formation-dialog/add-formation-dialog.component';
import { EditFormationDialogComponent } from '@app/edit-formation-dialog/edit-formation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formation',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationComponent implements OnInit {
  formations: Formation[] = [];
  selectedFormation: Formation | null = null;
   newFormation: Formation = {id: 0, titre: '', description: '', duree: '', prix: 0, contenu: '',image:'', etablissements:[], carrieres:[], courses:[] }; // Ajoutez cette propriété pour représenter la nouvelle formation à ajouter
   menuOpen=true;

   dataSource = new MatTableDataSource<Formation>(); // Source de données pour la table
   displayedColumns: string[] = ['id', 'titre', 'contenu', 'duree', 'description', 'prix'];
 
   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
 
   pageSize: number = 10; // Vous pouvez ajuster cette valeur selon vos besoins
 
  constructor(private formationService: FormationService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

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

  loadFormations() {
    this.formationService.getAllFormations().subscribe(data => {
      this.formations = data;
      this.dataSource = new MatTableDataSource<Formation>(this.formations.slice(0, 10)); // Charger les 10 premiers utilisateurs
      this.dataSource.paginator = this.paginator; // Configurer la pagination
    });
  }
  
  loadMoreFormations(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
  
    // Charger les utiliformations suivants selon l'index de page
    this.dataSource = new MatTableDataSource<Formation>(this.formations.slice(startIndex, endIndex));
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
    this.snackBar.open('Formation ajoutée avec succès', 'Fermer', {
      duration: 3000, // Durée en millisecondes
      verticalPosition: 'top', // Position verticale
      horizontalPosition: 'right', // Position horizontale
        panelClass: 'custom-snackbar'
    });
  });
}
  

updateFormation(updatedFormation: Formation): void {
  if (updatedFormation.id !== undefined) {
    this.formationService.updateFormation(updatedFormation.id, updatedFormation)
      .subscribe(() => {
        // Refresh the formation list after successful update
        this.loadFormations();
        this.snackBar.open('Formation mis à jour avec succès', 'Fermer', {
          duration: 3000, // Durée en millisecondes
          verticalPosition: 'top', // Position verticale
          horizontalPosition: 'right', // Position horizontale
            panelClass: 'custom-snackbar'
        });
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
          this.snackBar.open('Fpormation supprimée avec succès', 'Fermer', {
            duration: 3000, // Durée en millisecondes
            verticalPosition: 'top', // Position verticale
            horizontalPosition: 'right', // Position horizontale
              panelClass: 'custom-snackbar'
          });
        });
      }
    } else {
      console.error('L\'ID de la formation est indéfini.');
    }
  }
  
}
