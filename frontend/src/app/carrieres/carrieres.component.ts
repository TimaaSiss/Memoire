import { Component, OnInit, ViewChild } from '@angular/core';
import { Carriere } from '../model/carriere.model';
import { CarriereService } from '../services/carrieres.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCarriereDialogComponent } from '@app/edit-dialog-career/edit-dialog-career.component';
import { AddCareerDialogComponent } from '@app/add-career-dialog/add-career-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-carriere',
  templateUrl: './carrieres.component.html',
  styleUrls: ['./carrieres.component.scss']
})
export class CarriereComponent implements OnInit {

  carrieres: Carriere[] = [];
  menuOpen= true;
  dataSource = new MatTableDataSource<Carriere>();
  displayedColumns: string[] = ['id', 'nom', 'secteur', 'competences_requises', 'description', 'salaire', 'image'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  pageSize: number = 10;

  constructor(
    private carriereService: CarriereService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar, private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCarrieres();
    const storedMenuOpen = localStorage.getItem('menuOpen');
    if (storedMenuOpen !== null) {
      this.menuOpen = JSON.parse(storedMenuOpen);
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    localStorage.setItem('menuOpen', JSON.stringify(this.menuOpen));
  }
  
  loadCarrieres() {
    this.carriereService.getAllCarrieres().subscribe(data => {
      this.carrieres = data;
      this.dataSource = new MatTableDataSource<Carriere>(this.carrieres.slice(0, 10));
      this.dataSource.paginator = this.paginator;
    });
  }
  
  loadMoreCarrieres(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.dataSource = new MatTableDataSource<Carriere>(this.carrieres.slice(startIndex, endIndex));
  }

  confirmDeleteCarriere(carriere: Carriere): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette carrière ?")) {
      this.deleteCarriere(carriere.id);
    }
  }

  openEditDialog(carriere: Carriere): void {
    const dialogRef = this.dialog.open(EditCarriereDialogComponent, {
      width: '500px',
      data: carriere
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCarriere(result);
      }
    });
  }

  addCarriere(newCarriere: Carriere): void {
    this.carriereService.addCarriere(newCarriere).subscribe(() => {
      this.loadCarrieres();
      this.snackBar.open('Carrière ajoutée avec succès', 'Fermer', {
        duration: 3000, // Durée en millisecondes
        verticalPosition: 'top', // Position verticale
        horizontalPosition: 'right', // Position horizontale
          panelClass: 'custom-snackbar'
      });
    });
  }

  updateCarriere(updatedCarriere: Carriere): void {
     this.carriereService.updateCarriere(updatedCarriere.id, updatedCarriere).subscribe(() => {
      // Mettez à jour la liste des carrières après la modification réussie
      this.loadCarrieres();
      this.snackBar.open('Carrière mise à jour avec succès', 'Fermer', {
        duration: 3000, // Durée en millisecondes
        verticalPosition: 'top', // Position verticale
        horizontalPosition: 'right', // Position horizontale
          panelClass: 'custom-snackbar'
      });
    });
  }

  deleteCarriere(id: number): void {
    this.carriereService.deleteCarriere(id).subscribe(() => {
      this.loadCarrieres();
      this.snackBar.open('Carrière supprimée avec succès', 'Fermer', {
        duration: 3000, // Durée en millisecondes
        verticalPosition: 'top', // Position verticale
        horizontalPosition: 'right', // Position horizontale
          panelClass: 'custom-snackbar'
      });
    });
  }

  openAddCarriereDialog(): void {
    const dialogRef = this.dialog.open(AddCareerDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCarrieres();
      }
    });
  }

 
}
