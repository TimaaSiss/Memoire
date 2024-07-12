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
import { Formation } from '@app/model/formation.model';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '@app/message-dialog/message-dialog.component';
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
  carriereId!: number;
  formations: Formation[] = [];
  formationDetails: Formation | undefined;
  messageContent: string = '';
  mentorId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private carriereService: CarriereService,
    private commentaireService: CommentaireService,
    private userService: UserService,
    private videoMentorService: VideoMentorService,
    private router: Router,
    private dialog: MatDialog,
    private formationService: FormationService
  ) { }

  ngOnInit(): void {
    this.careerName = this.route.snapshot.paramMap.get('careerName') || '';
    this.carriereService.getCarriereByNom(this.careerName).subscribe(
      (data: Carriere) => {
        this.careerDetails = data;
        this.formations = data.formations || [];
        console.log('Career Details:', this.careerDetails);
        if (this.careerDetails && this.careerDetails.id) {
          this.loadCommentaires(this.careerDetails.id);
          this.loadMentorVideos(this.careerDetails.id);
          this.loadFormations(this.careerDetails.id); // Charger les formations associées
        }
      },
      (error: any) => {
        console.error('Error fetching career details:', error);
      }
    );

    this.currentUser = this.userService.getCurrentUser();
  }

  loadFormations(carriereId: number): void {
    this.carriereService.getFormationByCarriere(carriereId).subscribe(
      (data: Formation[]) => {
        this.formations = data;
      },
      (error: any) => {
        console.error('Error fetching formations:', error);
      }
    );
  }

  viewFormationDetails(formationTitre: string): void {
    this.router.navigate(['/formation-details', formationTitre]);
  }

  getFormationDetails(titre: string): void {
    this.formationService.getFormationWithEtablissementsByTitre(titre).subscribe(
      (details) => {
        this.formationDetails = details;
        console.log(this.formationDetails);
      },
      (error) => {
        console.error('Error fetching formation details:', error);
      }
    );
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
        console.log('Mentor Videos:', data);
        data.forEach(video => {
          if (video.mentor) {
            console.log('Mentor ID:', video.mentor.id);
          } else {
            console.warn('Video without mentor:', video);
          }
        });
      },
      (error: any) => {
        console.error('Error fetching mentor videos:', error);
      }
    );
  }

  openMessageDialog(mentorId: number): void {
    console.log('Opening message dialog with mentorId:', mentorId);
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        senderId: this.currentUser?.id,
        receiverId: mentorId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Message sent successfully:', result);
      }
    });
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

  goBack(): void {
    this.router.navigate(['/profile']); // Remplacez par la route correcte pour la page de profil
  }
}
