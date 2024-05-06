import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component'; // Importez le composant d'inscription
import { ConnexionComponent } from './connexion/connexion.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AdminComponent } from './admin/admin.component';
const routes: Routes = [
  { path: '', component: HomeComponent }, // Route par défaut pour HomeComponent
  { path: 'register', component: InscriptionComponent }, // Route vers InscriptionComponent
  { path: 'connexion', component: ConnexionComponent },
  { path: 'admin', component: AdminComponent }, 
  { path: 'users', component: UserListComponent },
  { path: 'adduser', component: UserFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
