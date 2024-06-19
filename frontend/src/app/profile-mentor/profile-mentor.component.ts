import { Component, OnInit } from '@angular/core';
import { MentorService } from '@app/services/mentors.service';
import { VideoMentorService } from '@app/services/video-mentor.service';
import { CourseService } from '@app/services/cours.service';
import { VideoMentor } from '@app/model/video-mentor';
import { Course } from '@app/model/cours.model';

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
  nouvelleVideo: VideoMentor = { id: 0, url: '', title: '', carriereId: 0 };
  nouveauCours: Course = new Course();
  currentUser: any;

  constructor(
    private mentorService: MentorService,
    private videoMentorService: VideoMentorService,
    private courseService: CourseService
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
          this.carriereId = mentorDetails.carriereId || 0; // Assigner carriereId à partir des détails du mentor
          this.nouvelleVideo.carriereId = this.carriereId; // Initialiser carriereId de nouvelleVideo
          this.loadVideosAndCourses(this.currentUser.id);
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du mentor : ', error);
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

  ajouterVideo() {
    this.videoMentorService.addVideo(this.currentUser.id, this.nouvelleVideo).subscribe(
      (result) => {
        console.log('Vidéo ajoutée avec succès:', result);
        this.videos.push(result);
        this.nouvelleVideo = { id: 0, url: '', title: '', carriereId: this.carriereId };
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la vidéo : ', error);
      }
    );
  }

  ajouterCours() {
    this.courseService.addCourse(this.nouveauCours).subscribe(
      (result) => {
        console.log('Cours ajouté avec succès:', result);
        this.courses.push(result);
        this.nouveauCours = new Course();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du cours : ', error);
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
      // Gérer le cas où video.id est undefined, selon la logique de votre application
    }
  }
  

  modifierCours(course: Course) {
    this.courseService.updateCourse(course.id, course).subscribe(
      (result) => {
        console.log('Cours mis à jour avec succès:', result);
        const index = this.courses.findIndex(c => c.id === result.id);
        if (index !== -1) {
          this.courses[index] = result;
        }
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du cours : ', error);
      }
    );
  }
}
