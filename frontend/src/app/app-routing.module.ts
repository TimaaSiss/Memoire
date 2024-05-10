import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component'; // Importez le composant d'inscription
import { ConnexionComponent } from './connexion/connexion.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionnairesComponent } from './questionnaireList/questionnaires.component';
import { MentorComponent } from './mentors/mentors.component';
import { CoursComponent } from './cours/cours.component';
import { FormationComponent } from './formations/formations.component';
import { CarriereComponent } from './carrieres/carrieres.component';
const routes: Routes = [
  { path: '', component: HomeComponent }, // Route par défaut pour HomeComponent
  { path: 'register', component: InscriptionComponent }, // Route vers InscriptionComponent
  { path: 'connexion', component: ConnexionComponent },
  { path: 'admin', component: AdminComponent }, 
  { path: 'users', component: UserListComponent },
  { path: 'adduser', component: UserFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'questionnaire', component: QuestionnairesComponent },
  { path: 'mentors', component: MentorComponent },
  { path: 'cours', component: CoursComponent },
  { path: 'formation', component: FormationComponent },
  { path: 'careers', component: CarriereComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
