// formation-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from '@app/model/formation.model';
import { FormationService } from '@app/services/formations.service';
import { Course } from '@app/model/cours.model';
import { CourseService } from '@app/services/cours.service';
import { Commentaire } from '@app/model/commentaires.model';
import { CommentaireService } from '@app/services/commentaires.service';
import { User } from '@app/model/user';
import { UserService } from '@app/services/user-service.service';
import { Carriere } from '@app/model/carriere.model';
import { CarriereService } from '@app/services/carrieres.service';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss']
})
export class FormationDetailsComponent implements OnInit {
  formationName: string = '';
  formationDetails: Formation | undefined;
  selectedCarriere: Carriere | undefined;
  careers: Carriere[] = [];
  coursList: Course[] = []; // Liste des cours associés à la formation
  formationId: number = 0;
  commentaires: Commentaire[] = []; // Liste des commentaires associés à la formation
  commentContent: string = '';
  currentUser: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService,
    private courseService: CourseService,
    private commentaireService: CommentaireService,
    private userService: UserService,
    private carriereService: CarriereService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formationName = this.route.snapshot.paramMap.get('formationName') || '';
    if (this.formationName) {
      this.loadFormationDetails(this.formationName);
    }
    this.currentUser = this.userService.getCurrentUser();
  }

  loadFormationDetails(formationName: string): void {
    this.formationService.getFormationWithEtablissementsByTitre(formationName).subscribe(
      (data: Formation) => {
        this.formationDetails = data;
        this.formationId = this.formationDetails.id;
        this.loadCarrieres(this.formationId);
        this.loadCours(this.formationId);
        this.loadCommentaires();
      },
      (error: any) => {
        console.error('Error fetching formation details:', error);
      }
    );
  }

  loadCarrieres(formationId: number): void {
    this.carriereService.getCarrieresByFormationId(formationId).subscribe(
      (data: Carriere[]) => {
        this.careers = data;
      },
      (error: any) => {
        console.error('Error fetching carrieres:', error);
      }
    );
  }

  loadCours(formationId: number): void {
    this.courseService.getCoursesByFormation(formationId).subscribe(
      (cours: Course[]) => {
        this.coursList = cours;
      },
      (error: any) => {
        console.error('Error fetching associated courses:', error);
      }
    );
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

  getCarriereDetails(nom: string): void {
    this.carriereService.getCarriereByNom(nom).subscribe(
      (carriere) => {
        this.selectedCarriere = carriere;
      },
      (error) => {
        console.error('Error fetching carriere details:', error);
      }
    );
  }

  viewCareerDetails(careerName: string): void {
    this.router.navigate(['/career-details', careerName]);
  }

  goBack(): void {
    this.router.navigate(['/profile']); // Remplacez par la route correcte pour la page de profil
  }
}
