import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/services/user-service.service';
import { User } from '../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  user: User;
  formData: User = new User();

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private userService: UserService,
      private snackBar: MatSnackBar) {
    this.user = new User();
  }

  onSubmit() {
    this.userService.save(this.user).subscribe(result => this.gotoUserList());
    if (this.formData.password !== this.formData.confirmPassword) {
      console.error('Les mots de passe ne correspondent pas');
      // Gérer l'erreur ici (peut-être afficher un message à l'utilisateur)
      return; // Arrêtez le traitement si les mots de passe ne correspondent pas
    }
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}