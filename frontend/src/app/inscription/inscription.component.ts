import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user-service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  formData: User = new User();
  errorMessage: string = '';
  usernameExistsError: string = ''; // Nouveau message d'erreur pour le nom d'utilisateur existant

  constructor(private userService: UserService, private router: Router) { }

  submitForm() {
    this.errorMessage = '';
    this.usernameExistsError = ''; // Réinitialisation du message d'erreur

    if (!this.isValidForm()) {
      return;
    }

    // Vérification si le nom d'utilisateur existe déjà
    this.userService.checkUsernameExists(this.formData.username).subscribe(
      exists => {
        if (exists) {
          this.usernameExistsError = 'Ce nom d\'utilisateur est déjà pris.';
        } else {
          // Sauvegarde de l'utilisateur si le nom d'utilisateur n'existe pas déjà
          this.saveUser();
        }
      },
      error => {
        console.error('Erreur lors de la vérification du nom d\'utilisateur :', error);
        this.errorMessage = 'Le nom d\'utilisateur existe déjà';
      }
    );
  }

  saveUser() {
    this.userService.save(this.formData).subscribe(
      response => {
        console.log('Utilisateur ajouté avec succès :', response);
        this.redirectUser(response.role);
        this.formData = new User(); // Réinitialisation du formulaire
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        this.errorMessage = 'Une erreur s\'est produite lors de l\'ajout de l\'utilisateur.';
      }
    );
  }

  isValidForm(): boolean {
    if (!this.formData.nom || !this.formData.prenom || !this.formData.username || !this.formData.mail || !this.formData.password || !this.formData.confirmPassword || !this.formData.role) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return false;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.formData.mail)) {
      this.errorMessage = 'Veuillez entrer une adresse email valide.';
      return false;
    }

    return true;
  }

  redirectUser(role: string) {
    if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else if (role === 'USER') {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/profileMentor']);
    }
  }
}
