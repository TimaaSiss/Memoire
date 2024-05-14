import { User } from './../model/user';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  activateUser(userId: number): void {
    this.userService.activateUser(userId).subscribe(() => {
      // Mettre à jour la liste des utilisateurs après activation réussie
    });
  }

  deactivateUser(userId: number): void {
    this.userService.deactivateUser(userId).subscribe(() => {
      // Mettre à jour la liste des utilisateurs après désactivation réussie
    });
  }

  toggleUserStatus(user: User): void {
    user.status = !user.status; // Inverser le statut de l'utilisateur
    let updateObservable: Observable<void>; // Ajuster le type en Observable<void>
    if (user.status) {
      updateObservable = this.userService.activateUser(user.id);
    } else {
      updateObservable = this.userService.deactivateUser(user.id);
    }
    
    updateObservable.subscribe(() => {
      // Si la mise à jour réussit, vous pouvez afficher un message de succès ou effectuer toute autre action nécessaire
      console.log(`Statut de l'utilisateur ${user.id} mis à jour avec succès.`);
    }, (error: any) => { // Spécifiez le type 'any' pour la variable 'error'
      // En cas d'erreur, vous pouvez afficher un message d'erreur ou gérer l'erreur de toute autre manière
      console.error(`Erreur lors de la mise à jour du statut de l'utilisateur ${user.id}:`, error);
      // Rétablir le statut précédent en cas d'erreur
      user.status = !user.status;
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
