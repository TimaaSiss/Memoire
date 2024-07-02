import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user-service.service';
import { CredentialsDto } from '@app/model/credentials-dto';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

  formData: CredentialsDto = new CredentialsDto();
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  submitForm() {
    this.errorMessage = ''; // Réinitialisation du message d'erreur

    this.userService.login(this.formData).subscribe(
      user => {
        console.log('Connexion réussie : ', user);
        if (user.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if(user.role === 'MENTOR') {
          this.router.navigate(['/profileMentor']);
        } else {
          this.router.navigate(['/profile']);
        }
        this.formData = new CredentialsDto(); // Réinitialisation du formulaire
      },
      error => {
        console.error('Erreur de connexion : ', error);
        if (error.status === 401) {
          this.errorMessage = 'Une erreur s\'est produite lors de la connexion.';
        } else {
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
        }
      }
    );
  }
}
