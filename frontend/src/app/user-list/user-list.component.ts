import { User } from './../model/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '@app/services/user-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { EditUserDialogComponent } from '@app/edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  selectedUser: User | null = null;
  menuOpen = true;
  dataSource = new MatTableDataSource<User>(); // Source de données pour la table
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'username', 'mail', 'role', 'status', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  pageSize: number = 10; // Vous pouvez ajuster cette valeur selon vos besoins

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers(0, 10);
    // Vérifier si la valeur de menuOpen est stockée localement
    const storedMenuOpen = localStorage.getItem('menuOpen');
    if (storedMenuOpen !== null) {
      // Si une valeur est trouvée dans le stockage local, la mettre à jour
      this.menuOpen = JSON.parse(storedMenuOpen);
    }
  }

  toggleMenu(): void {
    // Basculer l'état menuOpen
    this.menuOpen = !this.menuOpen;
    // Enregistrer l'état menuOpen dans le stockage du navigateur
    localStorage.setItem('menuOpen', JSON.stringify(this.menuOpen));
  }

  loadUsers(page: number, size: number) {
    this.userService.findAll(page, size).subscribe(data => {
      this.dataSource = new MatTableDataSource<User>(data.content);
      this.dataSource.paginator = this.paginator;
    });
  }

  loadMoreUsers(event: PageEvent) {
    this.loadUsers(event.pageIndex, event.pageSize);
  }

  activateUser(userId: number): void {
    this.userService.activateUser(userId).subscribe(() => {
      // Mettre à jour la liste des utilisateurs après activation réussie
      this.loadUsers(this.paginator.pageIndex, this.paginator.pageSize);
    });
  }

  deactivateUser(userId: number): void {
    this.userService.deactivateUser(userId).subscribe(() => {
      // Mettre à jour la liste des utilisateurs après désactivation réussie
      this.loadUsers(this.paginator.pageIndex, this.paginator.pageSize);
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

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      data: user // Passez l'utilisateur à votre composant de boîte de dialogue de modification
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si des données sont renvoyées depuis la boîte de dialogue, mettez à jour l'utilisateur
        this.updateUser(result);
      }
    });
  }

  updateUser(updatedUser: User) {
    this.userService.update(updatedUser.id, updatedUser).subscribe(() => {
      // Rechargez la liste des utilisateurs pour refléter les modifications
      this.loadUsers(this.paginator.pageIndex, this.paginator.pageSize);
    });
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
      this.loadUsers(this.paginator.pageIndex, this.paginator.pageSize);
    });
  }

}
