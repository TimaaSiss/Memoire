import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarriereService } from '@app/services/carrieres.service';
import { CommentaireService } from '@app/services/commentaires.service';
import { UserService } from '@app/services/user-service.service';
import { VideoMentorService } from '@app/services/video-mentor.service';
import { Carriere } from '@app/model/carriere.model';
import { Commentaire } from '@app/model/commentaires.model';
import { VideoMentor } from '@app/model/video-mentor';
import { User } from '@app/model/user';
import { FormationService } from '@app/services/formations.service';

@Component({
  selector: 'app-career-details',
  templateUrl: './career-details.component.html',
  styleUrls: ['./career-details.component.scss']
})
export class CareerDetailsComponent implements OnInit {
  careerName: string = '';
  careerDetails: Carriere | undefined;
  commentaires: Commentaire[] = [];
  commentContent: string = '';
  currentUser: User | null = null;
  mentorVideos: VideoMentor[] = [];

  constructor(
    private route: ActivatedRoute,
    private carriereService: CarriereService,
    private commentaireService: CommentaireService,
    private userService: UserService,
    private videoMentorService: VideoMentorService,
    private formationService: FormationService,
    private router: Router,
 
  ) { }

  ngOnInit(): void {
    this.careerName = this.route.snapshot.paramMap.get('careerName') || '';
    this.carriereService.getCarriereByNom(this.careerName).subscribe(
      (data: Carriere) => {
        this.careerDetails = data;
        if (this.careerDetails && this.careerDetails.id) {
          this.loadCommentaires(this.careerDetails.id);
          this.loadMentorVideos(this.careerDetails.id);
        }
      },
      (error: any) => {
        console.error('Error fetching career details:', error);
      }
    );

    this.currentUser = this.userService.getCurrentUser();
  }

  viewFormationDetails(formationName: string): void {
    this.router.navigate(['/formation-details', formationName]);
  }

  loadCommentaires(carriereId: number): void {
    this.commentaireService.getCommentairesByCarriereId(carriereId).subscribe(
      (data: Commentaire[]) => {
        this.commentaires = data;
      },
      (error: any) => {
        console.error('Error fetching commentaires:', error);
      }
    );
  }

  loadMentorVideos(carriereId: number): void {
    this.videoMentorService.getVideosByCarriereId(carriereId).subscribe(
      (data: VideoMentor[]) => {
        this.mentorVideos = data;
      },
      (error: any) => {
        console.error('Error fetching mentor videos:', error);
      }
    );
  }

  addCommentaire(): void {
    if (this.commentContent.trim() && this.careerDetails && this.currentUser) {
      const newComment: Commentaire = {
        contenu: this.commentContent,
        datePublication: new Date(),
        carriere: {
          id: this.careerDetails.id
        } as Carriere,
        user: {
          id: this.currentUser.id
        } as User
      };

      this.commentaireService.addCommentaire(newComment).subscribe(
        (commentaire: Commentaire) => {
          this.commentaires.push(commentaire);
          this.commentContent = '';
        },
        (error: any) => {
          console.error('Error adding commentaire:', error);
        }
      );
    }
  }
}
