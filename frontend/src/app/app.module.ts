import { CarriereComponent } from './carrieres/carrieres.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserService } from './services/user-service.service';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AdminComponent } from './admin/admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionnairesComponent } from './questionnaireList/questionnaires.component';
import { AddQuestionnaireDialogComponent } from './add-questionnaire-dialog/add-questionnaire-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { QuestionsComponent } from './questions/questions.component';
import { MentorComponent } from './mentors/mentors.component';
import { CoursComponent } from './cours/cours.component';
import { FormationComponent } from './formations/formations.component';
import { EditCarriereDialogComponent } from './edit-dialog-career/edit-dialog-career.component';
import { AddCareerDialogComponent } from './add-career-dialog/add-career-dialog.component';
import { AddCourseDialogComponent } from './add-cours-dialog/add-cours-dialog.component';
import { EditCourseDialogComponent } from './edit-cours-dialog/edit-cours-dialog.component';
import { AddFormationDialogComponent } from './add-formation-dialog/add-formation-dialog.component';
import { AddResponseDialogComponent } from './add-response-dialog/add-response-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NavbarComponent } from './navbar/navbar.component';
import { CareerCardComponent } from './career-card/career-card.component';
import { FormationCardComponent } from './formation-card/formation-card.component';
import { QuestionnaireDetailsComponent } from './questionnaire-details/questionnaire-details.component';


@NgModule({
  declarations: [
    AppComponent,
    
    HomeComponent,
         InscriptionComponent,
         ConnexionComponent,
         AdminComponent,
         UserListComponent,
         UserFormComponent,
         ProfileComponent,
         QuestionnairesComponent,
         AddQuestionnaireDialogComponent,
         QuestionsComponent,
         MentorComponent,
         CoursComponent,
         FormationComponent,
         CarriereComponent,
         EditCarriereDialogComponent,
         AddCareerDialogComponent,
         AddCourseDialogComponent,
         EditCourseDialogComponent,
         AddFormationDialogComponent,
         AddResponseDialogComponent,
         NavbarComponent,
         CareerCardComponent,
         FormationCardComponent,
         QuestionnaireDetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule, 
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }