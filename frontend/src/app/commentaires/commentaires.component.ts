import { Component, OnInit } from '@angular/core';
import { Commentaire } from '@app/model/commentaires.model';
import { CommentaireService } from '@app/services/commentaires.service';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.scss']
})
export class CommentairesComponent implements OnInit {
  commentaires: Commentaire[] = [];
  successMessage: string | null = null;

  constructor(private commentaireService: CommentaireService) {}

  ngOnInit(): void {
    this.fetchCommentaires();
  }

  fetchCommentaires(): void {
    this.commentaireService.getAllCommentaires().subscribe(
      (commentaires: Commentaire[]) => {
        this.commentaires = commentaires;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commentaires :', error);
      }
    );
  }
  

  deleteCommentaire(id: number | undefined): void {
    if (id !== undefined) {
      this.commentaireService.deleteCommentaire(id).subscribe(
        () => {
          this.commentaires = this.commentaires.filter(commentaire => commentaire.id !== id);
          this.successMessage = 'Commentaire supprimé supprimé avec succès';
          setTimeout(() => this.successMessage = null, 3000); // Efface le message après 3 secondes
        },
        (error) => {
          console.error('Erreur lors de la suppression du commentaire :', error);
        }
      );
    } else {
      console.error('ID du commentaire est indéfini.');
    }
  }
}
