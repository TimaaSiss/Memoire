import { User } from './../model/user';
import { Component, OnInit } from '@angular/core';

import { UserService } from '@app/services/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
  }

  editUser(user: User) {
    // Sélectionnez l'utilisateur pour la modification
    this.selectedUser = user;
  }

  updateUser() {
    if (this.selectedUser) {
      // Envoyez la demande de mise à jour de l'utilisateur
      this.userService.update(this.selectedUser.id, this.selectedUser).subscribe(() => {
        // Réinitialisez la sélection après la mise à jour réussie
        this.selectedUser = null;
        // Rechargez la liste des utilisateurs pour refléter les modifications
        this.loadUsers();
      });
    }
  }
  

  confirmDeleteUser(user: User) {
    // Demander confirmation avant la suppression de l'utilisateur
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur?")) {
      this.deleteUser(user);
    }
  }

  deleteUser(user: User) {
    // Envoyez la demande de suppression de l'utilisateur
    this.userService.delete(user.id).subscribe(() => {
      // Rechargez la liste des utilisateurs après la suppression réussie
      this.loadUsers();
    });
  }

}
