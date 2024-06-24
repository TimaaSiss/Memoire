import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from '@app/model/formation.model';
import { FormationService } from '@app/services/formations.service';
import { Course } from '@app/model/cours.model';
import { CourseService } from '@app/services/cours.service';
import { Commentaire } from '@app/model/commentaires.model';
import { CommentaireService } from '@app/services/commentaires.service';
import { User } from '@app/model/user';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss']
})
export class FormationDetailsComponent implements OnInit {
  formationName: string = '';
  formationDetails: Formation | undefined;
  coursList: Course[] = []; // Liste des cours associés à la formation
  formationId: number = 0;
  commentaires: Commentaire[] = []; // Liste des commentaires associés à la formation
  commentContent: string = '';
  currentUser?: User | null = null;
  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService,
    private courseService: CourseService,
    private commentaireService: CommentaireService
  ) { }

  ngOnInit(): void {
    this.formationName = this.route.snapshot.paramMap.get('formationName') || '';
    console.log('Formation name:', this.formationName);
    if (this.formationName) {
      // Récupérer les détails de la formation
      this.formationService.getFormationWithEtablissementsByTitre(this.formationName).subscribe(
        (data: Formation) => {
          this.formationDetails = data;
          console.log('Formation details:', this.formationDetails);
          
          // Mettre à jour formationId avec l'ID de la formation récupérée
          this.formationId = this.formationDetails.id;

          // Une fois que les détails de la formation sont récupérés, récupérer les cours associés
          this.courseService.getCoursesByFormation(this.formationId).subscribe(
            (cours: Course[]) => {
              this.coursList = cours;
              console.log('Cours associés:', this.coursList);
            },
            (error: any) => {
              console.error('Error fetching associated courses:', error);
            }
          );

          // Charger les commentaires spécifiques à cette formation
          this.loadCommentaires();
        },
        (error: any) => {
          console.error('Error fetching formation details:', error);
        }
      );
    }
  }

  loadCommentaires(): void {
    if (this.formationId) {
      this.commentaireService.getCommentairesByFormationId(this.formationId).subscribe(
        (data: Commentaire[]) => {
          this.commentaires = data;
        },
        (error: any) => {
          console.error('Error fetching commentaires:', error);
        }
      );
    }
  }

  addCommentaire(): void {
    if (this.commentContent.trim() && this.formationDetails && this.currentUser) {
      const newComment: Commentaire = {
        contenu: this.commentContent,
        datePublication: new Date(),
        formation: {
          id: this.formationDetails.id
        } as Formation,
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
