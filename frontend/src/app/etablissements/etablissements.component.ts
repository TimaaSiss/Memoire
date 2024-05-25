import { AddEtablissementDialogComponent } from './../add-etablissement-dialog/add-etablissement-dialog.component';
import { EtablissementService } from './../services/etablissement.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Etablissement } from '@app/model/etablissement.model';

@Component({
  selector: 'app-etablissements',
  templateUrl: './etablissements.component.html',
  styleUrls: ['./etablissements.component.scss']
})
export class EtablissementComponent implements OnInit {
  etablissements: Etablissement[] = [];
  selectedEtablissement: Etablissement | null = null;
   newEtablissement: Etablissement = {id: 0,nom: '', lieu: '', telephone: '', email: '' }; // Ajoutez cette propriété pour représenter la nouvelle formation à ajouter
   menuOpen=true;
  constructor(private etablissementService: EtablissementService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEtablissements();
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

  loadEtablissements(): void {
    this.etablissementService.getAllEtablissements().subscribe(etablissements => {
      this.etablissements = etablissements;
    });
  }

  openAddEtablissementDialog(): void {
    const dialogRef = this.dialog.open(AddEtablissementDialogComponent, {
      width: '500px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEtablissement(result);
      }
    });
  }
  //isFormation(object: any): object is Formation {
  // Vérifie si l'objet a les propriétés d'une Formation
  //return 'titre' in object && 'description' in object && 'duree' in object && 'prix' in object && 'contenu' in object;
//}


    addEtablissement(newEtablissement: Etablissement): void {
    this.etablissementService.addEtablissement(newEtablissement).subscribe(() => {
    this.loadEtablissements();
  });
}
  
 

  editEtablissement(etablissement: Etablissement): void {
    console.log("Etablissement à éditer :", etablissement);
    this.selectedEtablissement = etablissement;
  }

  updateEtablissement(): void {
    if (this.selectedEtablissement && this.selectedEtablissement.id !== undefined) {
      this.etablissementService.updateEtablissement(this.selectedEtablissement.id, this.selectedEtablissement)
        .subscribe(updatedEtablissement => {
          // Mettre à jour la formation dans la liste des formations
          const index = this.etablissements.findIndex(f => f.id === updatedEtablissement.id);
          if (index !== -1) {
            this.etablissements[index] = updatedEtablissement;
          }
          // Réinitialiser la formation sélectionnée
          this.selectedEtablissement = null;
        });
    }
  }
  confirmDeleteEtablissement(etablissement: Etablissement): void {
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer la formation "${etablissement.nom}" ?`);
    if (confirmDelete) {
      this.deleteEtablissement(etablissement);
    }
  }
  deleteEtablissement(etablissement: Etablissement): void {
    // Vérifier si l'ID de la formation est défini
    if (etablissement.id !== undefined) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet établissement ?')) {
        this.etablissementService.deleteEtablissement(etablissement.id).subscribe(() => {
          this.loadEtablissements();
        });
      }
    } else {
      console.error('L\'ID de l\'Etablissement est indéfini.');
    }
  }
  
}
