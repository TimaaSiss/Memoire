import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarriereService } from './../services/carrieres.service';
import { CommentaireService } from '@app/services/commentaires.service';
import { UserService } from '@app/services/user-service.service'; // Importez le UserService
import { Carriere } from '@app/model/carriere.model';
import { Commentaire } from '@app/model/commentaires.model';
import { User } from '@app/model/user';

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

  constructor(
    private route: ActivatedRoute,
    private carriereService: CarriereService,
    private commentaireService: CommentaireService,
    private userService: UserService // Injectez le UserService
  ) { }

  ngOnInit(): void {
    this.careerName = this.route.snapshot.paramMap.get('careerName') || '';
    this.carriereService.getCarriereByNom(this.careerName).subscribe(
      (data: Carriere) => {
        this.careerDetails = data;
        if (this.careerDetails && this.careerDetails.id) {
          this.loadCommentaires(this.careerDetails.id);
        }
      },
      (error: any) => {
        console.error('Error fetching career details:', error);
      }
    );

    this.currentUser = this.userService.getCurrentUser();
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
