import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importez le service Router
import { UserService } from '@app/services/user-service.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

  formData: any = {}; // Modèle pour stocker les données du formulaire

  constructor(private userService: UserService, private router: Router) { } // Injectez le service Router

  submitForm() {
    this.userService.login(this.formData).subscribe(
      (user) => {
        console.log('Connexion réussie : ', user);
        // Vérifier le rôle de l'utilisateur après la connexion réussie
        if (user.role === 'ADMIN') {
          // Rediriger vers la page d'administration si le rôle est ADMIN
          this.router.navigate(['/admin']);
        } else {
          // Pour les autres rôles, vous pouvez afficher un message de connexion réussie ou rediriger vers une autre page si nécessaire
          console.log('Connexion réussie pour un utilisateur non-administrateur');
          // Exemple de redirection vers une page différente
          this.router.navigate(['/profile']);
        }
        // Réinitialiser le formulaire
        this.formData = {};
      },
      (error) => {
        console.error('Erreur de connexion : ', error);
       }
    );
  }
}
