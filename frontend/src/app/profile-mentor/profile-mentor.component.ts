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
import { MessageService } from '@app/services/message.service';
import { Message } from '@app/model/message.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/model/user';
import { AddVideoDialogComponent } from '@app/add-video-dialog/add-video-dialog.component';
import { AddCourseDialogComponent } from '@app/add-cours-dialog/add-cours-dialog.component';
import { MessagesDialogComponent } from '@app/messages-dialog/messages-dialog.component';
import { Mentor } from '@app/model/mentor.model';

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
  mentorId: number=0;
  videos: VideoMentor[] = [];
  courses: Course[] = [];
  nouvelleVideo: VideoMentor = { id: 0, fileName: '', title: '',  carriere: { id: 0, nom: '', description: '', secteur: '', competences_requises: '' } as Carriere, url:'', mentor: { id: 0, nom:'',prenom:'',specialite:'' } as Mentor,  user: { id: 0, nom:'',prenom:'' } as User };
  nouveauCours: Course = new Course();
  currentUser: any;
  formations: Formation[] = [];
  carrieres: Carriere[] = [];
  formationDetails: Formation | undefined;
  selectedCourse: Course | null = null;
  selectedFile: File | null = null;
  sanitizedVideoUrls: { [key: string]: SafeUrl } = {};
  messages: Message[] = [];
 // mentorId: number | null = null; // ID du mentor qui a posté la vidéo
  messageContent: string = '';
  showMoreCourses: boolean = false;

  constructor(
    private mentorService: MentorService,
    private videoMentorService: VideoMentorService,
    private courseService: CourseService,
    private formationService: FormationService,
    private carriereService: CarriereService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
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
         // this.carriereId = mentorDetails.carriereId || 0;
          this.nouvelleVideo.carriere.id = this.carriereId;
          this.loadVideosAndCourses(this.currentUser.id);
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du mentor : ', error);
        }
      );

      this.loadCarrieres();
      this.loadFormations();
      this.loadMessages();
       
    }
    this.route.paramMap.subscribe(params => {
      const mentorIdParam = params.get('mentorId');
      if (mentorIdParam) {
        this.mentorId = +mentorIdParam;
      } else {
        console.error('MentorId est manquant dans l\'URL');
      }
    });
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
    const dialogRef = this.dialog.open(AddVideoDialogComponent, {
      width: '500px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.video && result.file) {
        const formData = new FormData();
        formData.append('file', result.file);
        formData.append('mentorId', this.currentUser.id.toString());
        formData.append('carriereId', result.video.carriere.id.toString());
        formData.append('title', result.video.title);
        formData.append('userId', this.currentUser.id.toString()); // Ajoutez l'ID de l'utilisateur ici
  
        this.videoMentorService.uploadVideo(this.currentUser.id, formData).subscribe(
          (response) => {
            
            if (response) {
                         
              this.videos.push(response);
              if (response.id !== undefined) {
                this.loadVideoUrl(response); // Charger l'URL pour la nouvelle vidéo ajoutée
              }
            } 
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la vidéo :', error);
          }
        );
      }
    });
  }
  
  
  
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }


  // Ajout de la méthode pour ouvrir la boîte de dialogue d'ajout de cours
  openAddCourseDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ajouterCours(result);
      }
    });
  }

  // Mettre à jour la méthode d'ajout de cours pour prendre en compte le résultat de la boîte de dialogue
  ajouterCours(coursData: any): void {
    this.nouveauCours = coursData;
    this.nouveauCours.mentorId = this.currentUser.id;
    this.nouveauCours.userId = this.currentUser.id;
  
    if (this.nouveauCours.formationId) {
      this.courseService.addCourse(this.currentUser.id, this.nouveauCours, this.nouveauCours.formationId).subscribe(
        (result) => {
          console.log('Cours ajouté avec succès:', result);
          this.courses.push(result);
          this.nouveauCours = new Course();
  
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
    if (confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) {
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
  }

  supprimerCours(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
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

  sendMessage(): void {
    if (this.currentUser && this.mentorId) {
      const message = {
        senderId: this.currentUser.id,
        receiverId: this.mentorId,
        content: this.messageContent
      };

      this.messageService.sendMessage(message).subscribe(
        response => {
          console.log('Message envoyé avec succès', response);
        },
        error => {
          console.error('Erreur lors de l\'envoi du message', error);
        }
      );
    } else {
      console.error('CurrentUser ou MentorId est manquant');
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

  loadMessages(): void {
    this.messageService.getMessagesByReceiver(this.currentUser.id).subscribe(
      (messages) => {
        this.messages = messages;
        console.log('Messages récupérés pour le mentor:', this.messages); // Ajoutez ce log
      },
      (error) => console.error('Erreur lors de la récupération des messages :', error)
    );
  }
  
  openMessagesDialog(): void {
    const dialogRef = this.dialog.open(MessagesDialogComponent, {
      width: '500px',
      data: { messages: this.messages, currentUser: this.currentUser }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Boîte de dialogue de messages fermée');
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

  toggleMoreCourses(): void {
    this.showMoreCourses = !this.showMoreCourses;
  }

 

  logout(): void {
    // Logique de déconnexion ici (par exemple, supprimer les données de session, vider le local storage, etc.)
    localStorage.removeItem('currentUser'); // Exemple de suppression des données de session
    this.router.navigate(['/home']); // Redirigez l'utilisateur vers la page de connexion après la déconnexion
  }
}
