import { Component } from '@angular/core';
import { UserService } from '@app/service/user-service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {

  formData: User = new User(); // Créer un nouvel objet User pour stocker les données du formulaire

  constructor(private userService: UserService) { }

  submitForm() {
    this.userService.save(this.formData)
      .subscribe(
        response => {
          console.log('Utilisateur ajouté avec succès :', response);
          // Réinitialiser le formulaire après l'ajout réussi
          this.formData = new User();
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
          // Gérer les erreurs ici
        }
      );
  }
}
