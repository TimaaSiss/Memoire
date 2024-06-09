// src/app/inscription/inscription.component.ts

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

  constructor(private userService: UserService, private router: Router) { }

  submitForm() {
    if (this.formData.password !== this.formData.confirmPassword) {
      console.error('Les mots de passe ne correspondent pas');
      return;
    }

    this.userService.save(this.formData).subscribe(
      response => {
        console.log('Utilisateur ajouté avec succès :', response);
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if(response.role === 'USER'){
          this.router.navigate(['/profile']);
        }else{
          this.router.navigate(['/profileMentor']);
        }
        this.formData = new User();
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      }
    );
  }
}
