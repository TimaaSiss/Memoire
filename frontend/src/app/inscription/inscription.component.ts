import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importez le service Router
import { UserService } from '@app/services/user-service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {

  formData: User = new User(); // Créer un nouvel objet User pour stocker les données du formulaire

  constructor(private userService: UserService, private router: Router) { }

  submitForm() {
    if (this.formData.password !== this.formData.confirmPassword) {
      console.error('Les mots de passe ne correspondent pas');
      // Gérer l'erreur ici (peut-être afficher un message à l'utilisateur)
      return; // Arrêtez le traitement si les mots de passe ne correspondent pas
    }
  
    this.userService.save(this.formData)
      .subscribe(
        response => {
          console.log('Utilisateur ajouté avec succès :', response);
          // Vérifier le rôle de l'utilisateur après l'inscription réussie
          if (response.role === 'ADMIN') {
            // Rediriger vers la page d'administration si le rôle est ADMIN
            this.router.navigate(['/admin']);
          } else {
            // Rediriger vers la page de profil pour les autres rôles
            this.router.navigate(['/profile']);
          }
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
