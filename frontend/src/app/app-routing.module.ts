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
//import { QuestionsComponent } from './questions/questions.component';
import { QuestionnaireDetailsComponent } from './questionnaire-details/questionnaire-details.component';
import { CareerDetailsComponent } from './career-details/career-details.component';
import { FormationDetailsComponent } from './formation-details/formation-details.component';
import { EtablissementComponent } from './etablissements/etablissements.component';
import { MentorProfileComponent } from './profile-mentor/profile-mentor.component';
import { QuestionnaireResultComponent } from './questionnaire-result/questionnaire-result.component';
import { CommentairesComponent } from './commentaires/commentaires.component';
import { QuestionnaireHistoryComponent } from './questionnaire-history/questionnaire-history.component';

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
  { path: 'etablissements', component: EtablissementComponent },
  { path: 'careers', component: CarriereComponent },
  { path: 'questionnaires/:id', component: QuestionnaireDetailsComponent },
  {path: 'home', component: HomeComponent},
  { path: 'career-details/:careerName', component: CareerDetailsComponent },
  {path: 'formation-details/:formationName', component: FormationDetailsComponent},
  {path: 'profileMentor', component: MentorProfileComponent},
  { path: 'questionnaire-result', component: QuestionnaireResultComponent }, // Ajoutez la nouvelle route
  { path: 'commentaires', component: CommentairesComponent },
  { path: 'questionnaire-history', component: QuestionnaireHistoryComponent },
 
 // { path: '**', redirectTo: 'questionnaires/1', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
