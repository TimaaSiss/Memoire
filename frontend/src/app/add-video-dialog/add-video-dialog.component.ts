import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VideoMentor } from '@app/model/video-mentor';
import { Carriere } from '@app/model/carriere.model';
import { Mentor } from '@app/model/mentor.model';
import { User } from '@app/model/user';
import { CarriereService } from '@app/services/carrieres.service';

@Component({
  selector: 'app-add-video-dialog',
  templateUrl: './add-video-dialog.component.html',
  styleUrls: ['./add-video-dialog.component.scss']
})
export class AddVideoDialogComponent implements OnInit {
  nouvelleVideo: VideoMentor = {
    id: 0,
    fileName: '',
    title: '',
    carriere: { id: 0, nom: '', description: '', secteur: '', competences_requises: '' } as Carriere,
    mentor: { id: 0, nom: '', prenom: '', specialite: '' } as Mentor,
    user: { id: 0, nom: '', prenom: '', username: '' } as User,
    url: '' // Ajoutez la propriété 'url' ici avec une valeur par défaut appropriée
  };
  carrieres: Carriere[] = [];
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddVideoDialogComponent>,
    private carriereService: CarriereService
  ) {}

  ngOnInit(): void {
    this.loadCarrieres();

    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      this.nouvelleVideo.user.id = currentUser.id; // Initialiser l'ID de l'utilisateur
    }

  }

  loadCarrieres(): void {
    this.carriereService.getAllCarrieres().subscribe(
      (carrieres) => this.carrieres = carrieres,
      (error) => console.error('Erreur lors de la récupération des carrières :', error)
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.dialogRef.close({ video: this.nouvelleVideo, file: this.selectedFile });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
