import { Component, OnInit } from '@angular/core';
import { MentorService } from '@app/services/mentors.service';
import { VideoMentorService } from '@app/services/video-mentor.service';
import { CourseService } from '@app/services/cours.service';
import { FormationService } from '@app/services/formations.service';

import { VideoMentor } from '@app/model/video-mentor';
import { Course } from '@app/model/cours.model';
import { Formation } from '@app/model/formation.model';
import { Carriere } from '@app/model/carriere.model';
import { EditCourseDialogComponent } from '@app/edit-cours-dialog/edit-cours-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CarriereService } from '@app/services/carrieres.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  nouvelleVideo: VideoMentor = { id: 0, fileName: '', title: '', carriereId: 0, url:'' };
  nouveauCours: Course = new Course();
  currentUser: any;
  formations: Formation[] = [];
  carrieres: Carriere[] = [];
  formationDetails: Formation | undefined;
  selectedCourse: Course | null = null;
  selectedFile: File | null = null;
  sanitizedVideoUrls: { [key: string]: SafeUrl } = {};


  constructor(
    private mentorService: MentorService,
    private videoMentorService: VideoMentorService,
    private courseService: CourseService,
    private formationService: FormationService,
    private carriereService: CarriereService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
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

      this.loadCarrieres();
      this.loadFormations();
       
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

  loadVideoUrl(video: VideoMentor): void {
    if (video.id !== undefined) {
        this.videoMentorService.getVideo(video.fileName).subscribe(
            (blob) => {
                const url = URL.createObjectURL(blob);
                this.sanitizedVideoUrls[video.id] = this.sanitizer.bypassSecurityTrustUrl(url);
            },
            (error) => console.error('Erreur lors de la récupération de la vidéo :', error)
        );
    } else {
        console.error('ID de la vidéo non défini. Impossible de charger l\'URL de la vidéo.');
    }
}

  
  loadCarrieres(): void {
    this.carriereService.getAllCarrieres().subscribe(
      (carrieres) => this.carrieres = carrieres,
      (error) => console.error('Erreur lors de la récupération des carrières :', error)
    );
  }

  loadFormations(): void {
    this.formationService.getAllFormations().subscribe(
      (formations) => this.formations = formations,
      (error) => console.error('Erreur lors de la récupération des formations :', error)
    );
  }

  ajouterVideo(): void {
    if (!this.selectedFile) {
      console.error('Aucun fichier sélectionné.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('mentorId', this.currentUser.id.toString());
    formData.append('carriereId', this.nouvelleVideo.carriereId.toString());
    formData.append('title', this.nouvelleVideo.title);
  
    this.videoMentorService.uploadVideo(this.currentUser.id, formData).subscribe(
      (result) => {
        console.log('Vidéo ajoutée avec succès:', result);
        if (result.video) {
          this.videos.push(result.video);
          if (result.video.id !== undefined) {
            this.loadVideoUrl(result.video); // Load URL for the newly added video
          }
        }
        this.nouvelleVideo = { id: 0, title: '', fileName: '', carriereId: this.carriereId, url:'' };
        this.selectedFile = null;
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la vidéo :', error);
      }
    );
  }
  
  

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  ajouterCours(): void {
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
          console.error('Erreur lors de l\'ajout du cours :', error);
        }
      );
    } else {
      console.error('Aucune formation sélectionnée.');
    }
  }

  refreshFormationDetails(formationId: number): void {
    this.courseService.getCoursesByFormation(formationId).subscribe(
      (courses) => {
        console.log('Cours associés à la formation après ajout :', courses);
        if (this.formationDetails) {
          this.formationDetails.courses = courses;
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours associés à la formation :', error);
      }
    );
  }

  supprimerVideo(id: number): void {
    this.videoMentorService.deleteVideo(id).subscribe(
      () => {
        console.log('Vidéo supprimée avec succès');
        this.videos = this.videos.filter(video => video.id !== id);
      },
      (error) => {
        console.error('Erreur lors de la suppression de la vidéo :', error);
      }
    );
  }

  supprimerCours(id: number): void {
    this.courseService.deleteCourse(id).subscribe(
      () => {
        console.log('Cours supprimé avec succès');
        this.courses = this.courses.filter(course => course.id !== id);
      },
      (error) => {
        console.error('Erreur lors de la suppression du cours :', error);
      }
    );
  }

  modifierVideo(video: VideoMentor): void {
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
          console.error('Erreur lors de la mise à jour de la vidéo :', error);
        }
      );
    } else {
      console.error('ID de la vidéo non défini. Impossible de mettre à jour.');
    }
  }

  openEditDialog(course: Course): void {
    const dialogRef = this.dialog.open(EditCourseDialogComponent, {
      width: '500px',
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCourse(result);
      }
    });
  }

  updateCourse(course: Course): void {
    if (course.id !== undefined) {
      this.courseService.updateCourse(course.id, course).subscribe(
        (updatedCourse) => {
          const index = this.courses.findIndex(c => c.id === updatedCourse.id);
          if (index !== -1) {
            this.courses[index] = updatedCourse;
          }
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du cours :', error);
        }
      );
    }
  }
}
