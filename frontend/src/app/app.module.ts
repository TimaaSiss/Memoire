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
         CoursComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule, 
    MatInputModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }