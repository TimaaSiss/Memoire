// src/app/connexion/connexion.component.ts

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

  constructor(private userService: UserService, private router: Router) { }

  submitForm() {
    this.userService.login(this.formData).subscribe(
      user => {
        console.log('Connexion réussie : ', user);
        if (user.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/profile']);
        }
        this.formData = new CredentialsDto();
      },
      error => {
        console.error('Erreur de connexion : ', error);
      }
    );
  }
}
