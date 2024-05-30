import { Component, OnInit, ViewChild } from '@angular/core';
import { Carriere } from '../model/carriere.model';
import { CarriereService } from '../services/carrieres.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCarriereDialogComponent } from '@app/edit-dialog-career/edit-dialog-career.component';
import { AddCareerDialogComponent } from '@app/add-career-dialog/add-career-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-carriere',
  templateUrl: './carrieres.component.html',
  styleUrls: ['./carrieres.component.scss']
})
export class CarriereComponent implements OnInit {

  carrieres: Carriere[] = [];
  menuOpen= true;
  dataSource = new MatTableDataSource<Carriere>(); // Source de données pour la table
  displayedColumns: string[] = ['id', 'nom', 'secteur', 'competences_requises', 'description', 'salaire', 'image'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  pageSize: number = 10; // Vous pouvez ajuster cette valeur selon vos besoins

  constructor(
    private carriereService: CarriereService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCarrieres();
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
  
  loadCarrieres() {
    this.carriereService.getAllCarrieres().subscribe(data => {
      this.carrieres = data;
      this.dataSource = new MatTableDataSource<Carriere>(this.carrieres.slice(0, 10)); // Charger les 10 premiers utilisateurs
      this.dataSource.paginator = this.paginator; // Configurer la pagination
    });
  }
  
  loadMoreCarrieres(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
  
    // Charger les utilisateurs suivants selon l'index de page
    this.dataSource = new MatTableDataSource<Carriere>(this.carrieres.slice(startIndex, endIndex));
  }
  confirmDeleteCarriere(carriere: Carriere): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette carrière ?")) {
      this.deleteCarriere(carriere.id);
    }
  }

  openEditDialog(carriere: Carriere): void {
    console.log("Données à éditer :", carriere);
    const dialogRef = this.dialog.open(EditCarriereDialogComponent, {
      width: '500px',
      data: carriere
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log("Résultat de la boîte de dialogue de modification :", result);
      // Si des données sont renvoyées, mettez à jour la carrière correspondante
      if (result) {
        this.updateCarriere(result);
      }
    });
  }

  updateCarriere(updatedCarriere: Carriere): void {
    console.log("Cest bizarre:" ,updatedCarriere)
    this.carriereService.updateCarriere(updatedCarriere.id, updatedCarriere).subscribe(() => {
      // Mettez à jour la liste des carrières après la modification réussie
      this.loadCarrieres();
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddCareerDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCarriere(result);
      }
    });
  }

  addCarriere(newCarriere: Carriere): void {
    this.carriereService.addCarriere(newCarriere).subscribe(() => {
      this.loadCarrieres();
    });
  }

  deleteCarriere(id: number): void {
    this.carriereService.deleteCarriere(id).subscribe(() => {
      this.loadCarrieres();
    });
  }
}
