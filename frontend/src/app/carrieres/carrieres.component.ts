import { Component, OnInit } from '@angular/core';
import { Carriere } from '../model/carriere.model';
import { CarriereService } from '../services/carrieres.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCarriereDialogComponent } from '@app/edit-dialog-career/edit-dialog-career.component';
import { AddCareerDialogComponent } from '@app/add-career-dialog/add-career-dialog.component';

@Component({
  selector: 'app-carriere',
  templateUrl: './carrieres.component.html',
  styleUrls: ['./carrieres.component.scss']
})
export class CarriereComponent implements OnInit {

  carrieres: Carriere[] = [];

  constructor(
    private carriereService: CarriereService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCarrieres();
  }

  loadCarrieres(): void {
    this.carriereService.getAllCarrieres().subscribe(carrieres => {
      this.carrieres = carrieres;
    });
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
