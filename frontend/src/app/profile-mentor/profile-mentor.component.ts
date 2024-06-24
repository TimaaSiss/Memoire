import { Component, OnInit } from '@angular/core';
import { MentorService } from '@app/services/mentors.service';
import { VideoMentorService } from '@app/services/video-mentor.service';
import { CourseService } from '@app/services/cours.service';
import { VideoMentor } from '@app/model/video-mentor';
import { Course } from '@app/model/cours.model';
import { FormationService } from '@app/services/formations.service';
import { Formation } from '@app/model/formation.model';
import { EditCourseDialogComponent } from '@app/edit-cours-dialog/edit-cours-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mentor-profile',
  templateUrl: './profile-mentor.component.html',
  styleUrls: ['./profile-mentor.component.scss']
})
export class MentorProfileComponent implements OnInit {
  prenom: string = "";
  nom: string = "";
  mail: string = "";
  specialite: string = "";
  carriereId: number = 0;
  videos: VideoMentor[] = [];
  courses: Course[] = [];
  nouvelleVideo: VideoMentor = { id: 0, fileName: '', title: '', carriereId: 0 };
  nouveauCours: Course = new Course();
  currentUser: any;
  formations: Formation[] = []; // Ajout d'une variable pour stocker les formations disponibles
  formationDetails: Formation | undefined;
  selectedCourse: Course | null = null;
  selectedFile: File | null = null;

  constructor(
    private mentorService: MentorService,
    private videoMentorService: VideoMentorService,
    private courseService: CourseService,
    private formationService: FormationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      this.currentUser = JSON.parse(currentUserString);
      console.log('currentUser :', this.currentUser);
      
      this.prenom = this.currentUser.prenom || '';
      this.nom = this.currentUser.nom || '';
      this.mail = this.currentUser.mail || '';

      this.mentorService.getMentorById(this.currentUser.id).subscribe(
        (mentorDetails) => {
          console.log('mentorDetails:', mentorDetails);
          this.specialite = mentorDetails.specialite || '';
          this.carriereId = mentorDetails.carriereId || 0;
          this.nouvelleVideo.carriereId = this.carriereId;
          this.loadVideosAndCourses(this.currentUser.id);
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du mentor : ', error);
        }
      );

      // Charger les formations disponibles
      this.formationService.getAllFormations().subscribe(
        (formations) => {
          this.formations = formations;
        },
        (error) => {
          console.error('Erreur lors de la récupération des formations :', error);
        }
      );
    }
  }

  loadVideosAndCourses(mentorId: number): void {
    this.videoMentorService.getVideosByMentor(mentorId).subscribe(
      (videos) => this.videos = videos,
      (error) => console.error('Erreur lors de la récupération des vidéos :', error)
    );

    this.courseService.getCoursesByMentor(mentorId).subscribe(
      (courses) => this.courses = courses,
      (error) => console.error('Erreur lors de la récupération des cours :', error)
    );
  }

  ajouterVideo(): void {
    if (!this.selectedFile) {
      console.error('Aucun fichier sélectionné.');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', this.nouvelleVideo.title);
    formData.append('file', this.selectedFile);
  
    this.videoMentorService.uploadVideo(this.currentUser.id, formData).subscribe(
      (result) => {
        console.log('Vidéo ajoutée avec succès:', result);
        this.videos.push(result);
        this.nouvelleVideo = { id: 0, title: '', fileName: '', carriereId: this.carriereId };
        this.selectedFile = null;
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la vidéo : ', error);
      }
    );
  }
  
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  
  
  
  ajouterCours() {
    console.log(this.currentUser.id);
    this.nouveauCours.mentorId = this.currentUser.id;
    this.nouveauCours.userId = this.currentUser.id;
  
    if (this.formationDetails) {
      this.nouveauCours.formationId = this.formationDetails.id;
    }
    
    if (this.formationDetails) {
      this.courseService.addCourse(this.currentUser.id, this.nouveauCours, this.formationDetails.id).subscribe(
        (result) => {
          console.log('Cours ajouté avec succès:', result);
          this.courses.push(result);
          this.nouveauCours = new Course();
  
          // Rafraîchir les détails de la formation après l'ajout du cours
          if (result.formationId) {
            this.refreshFormationDetails(result.formationId);
          }
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du cours : ', error);
        }
      );
    } else {
      console.error('Aucune formation sélectionnée.');
    }
  }
  
  // Méthode pour rafraîchir les détails de la formation après l'ajout d'un cours
  refreshFormationDetails(formationId: number) {
    this.courseService.getCoursesByFormation(formationId).subscribe(
      (courses) => {
        console.log('Cours associés à la formation après ajout :', courses);
        if (this.formationDetails) {
          this.formationDetails.courses = courses; // Mettre à jour les cours de la formation
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours associés à la formation :', error);
      }
    );
  }
  

  supprimerVideo(id: number) {
    this.videoMentorService.deleteVideo(id).subscribe(
      () => {
        console.log('Vidéo supprimée avec succès');
        this.videos = this.videos.filter(video => video.id !== id);
      },
      (error) => {
        console.error('Erreur lors de la suppression de la vidéo : ', error);
      }
    );
  }

  supprimerCours(id: number) {
    this.courseService.deleteCourse(id).subscribe(
      () => {
        console.log('Cours supprimé avec succès');
        this.courses = this.courses.filter(course => course.id !== id);
      },
      (error) => {
        console.error('Erreur lors de la suppression du cours : ', error);
      }
    );
  }

  modifierVideo(video: VideoMentor) {
    if (video.id !== undefined) {
      this.videoMentorService.updateVideo(video.id, video).subscribe(
        (result) => {
          console.log('Vidéo mise à jour avec succès:', result);
          const index = this.videos.findIndex(v => v.id === result.id);
          if (index !== -1) {
            this.videos[index] = result;
          }
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la vidéo : ', error);
        }
      );
    } else {
      console.error('ID de la vidéo non défini. Impossible de mettre à jour.');
    }
  }

  openEditDialog(course: Course): void {
    const dialogRef = this.dialog.open(EditCourseDialogComponent, {
      width: '500px',
      data: course // Passez le cours à votre composant de boîte de dialogue de modification
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si des données sont renvoyées depuis la boîte de dialogue, mettez à jour le cours
        this.updateCourse(result);
      }
    });
  }

  updateCourse(course: Course): void {
    if (this.selectedCourse) {
      this.courseService.updateCourse(this.selectedCourse.id, this.selectedCourse)
        .subscribe(updatedCourse => {
          // Mettre à jour le cours dans la liste des cours
          const index = this.courses.findIndex(c => c.id === updatedCourse.id);
          if (index !== -1) {
            this.courses[index] = updatedCourse;
          }
          // Réinitialiser le cours sélectionné
          this.selectedCourse = null;
        });
    }
  }
}
