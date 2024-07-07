import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user-service.service';
import { QuestionnaireService } from '@app/services/questionnaire-service.service';
import { ReponseUserService } from '@app/services/reponse-user.service';
import { CarriereService } from '@app/services/carrieres.service';
import { FormationService } from '@app/services/formations.service'; // Importer le service Formation
import { Carriere } from '@app/model/carriere.model';
import { Formation } from '@app/model/formation.model'; // Importer Formation
import { Message } from '@app/model/message.model';
import { MessageService } from '@app/services/message.service';
import { MessagesDialogComponent } from '@app/messages-dialog/messages-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string = "";
  progress: number = 0;
  totalQuestions: number = 0;

  careers: Carriere[] = [];

  formations: Formation[] = [];

  filteredCareers: Carriere[] = [];
  messages: Message[] = [];
 
  searchTerm: string = '';
  filteredFormations: Formation[] = [];

  currentUser!: any;
  selectedCarriere: Carriere | null = null;
  formationDetails: Formation | null = null; 

  constructor(
    private userService: UserService,
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private reponseUserService: ReponseUserService,
    private carriereService: CarriereService,
    private messageService: MessageService, 
    private formationService: FormationService, // Inject formation Service
    public dialog: MatDialog 
  ) { }

  ngOnInit(): void {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      this.currentUser = JSON.parse(currentUserString);
      this.username = this.currentUser.username;
  
      // Ensure totalQuestions is calculated before calculating progress
      this.calculateTotalQuestions(() => {
        this.calculateProgress(this.currentUser.id);
      });
    } else {
      this.username = '';
    }

    this.getCarrieres();
    this.getFormations();
  
    this.filteredCareers = this.careers;
    this.filteredFormations = this.formations;
  }
  
  calculateTotalQuestions(callback?: () => void): void {
    this.questionnaireService.getAllQuestionnaires().subscribe(
      (questionnaires) => {
        let totalQuestions = 0;
        for (const questionnaire of questionnaires) {
          totalQuestions += questionnaire.questions.length;
        }
        this.totalQuestions = totalQuestions;
        console.log('Total Questions:', this.totalQuestions);
  
        // Call the callback if provided
        if (callback) {
          callback();
        }
      },
      (error) => {
        console.error('Error fetching questionnaires:', error);
      }
    );
  }
  

  calculateProgress(userId: number): void {
    let answeredQuestions = 0;
  
    // Fetch user responses
    this.reponseUserService.getUserResponses(userId).subscribe(
      (responses) => {
        answeredQuestions = responses.length;
        console.log('Answered Questions:', answeredQuestions);
  
        // Ensure totalQuestions is greater than 0 to avoid division by zero
        if (this.totalQuestions > 0) {
          // Log the values before calculation
          console.log('Total Questions:', this.totalQuestions);
          console.log('Answered Questions:', answeredQuestions);
  
          // Calculate progress
          this.progress = (answeredQuestions / this.totalQuestions) * 100;
          console.log('Calculated Progress:', this.progress);
        } else {
          this.progress = 0;
          console.warn('Total Questions is 0, setting progress to 0');
        }
      },
      (error) => {
        console.error('Error fetching user responses:', error);
      }
    );
  }
  
  
  navigateToHistory(): void {
    this.router.navigate(['/questionnaire-history']);
  }

  filterCareers(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredCareers = this.careers;
    } else {
      this.filteredCareers = this.careers.filter(career => career.nom.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }

  filterFormations(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredFormations = this.formations;
    } else {
      this.filteredFormations = this.formations.filter(formation => formation.titre.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }

  loadMessages(): void {
    if (this.currentUser && this.currentUser.id) {
      this.messageService.getMessagesByReceiver(this.currentUser.id).subscribe(
        (messages) => {
          this.messages = messages;
          console.log('Messages reçus:', this.messages); // Ajoutez cette ligne pour le débogage
        },
        (error) => console.error('Erreur lors de la récupération des messages :', error)
      );
    } else {
      console.error('Utilisateur non défini ou ID utilisateur manquant');
    }
  }
  
  
  openMessagesDialog(): void {
    const dialogRef = this.dialog.open(MessagesDialogComponent, {
      width: '500px',
      data: { messages: this.messages }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Boîte de dialogue de messages fermée');
      }
    });
  }
  


  navigateToQuestionPage(): void {
    this.router.navigate(['/questionnaires/:id']);
  }

  logout(): void {
    if (this.currentUser && this.currentUser.id) {
      localStorage.removeItem('currentUser');
      localStorage.setItem('userProgress', JSON.stringify({
        userId: this.currentUser.id,
        progress: this.progress
      }));
      this.router.navigate(['/home']);
    }
  }

  getCarrieres(): void {
    this.carriereService.getAllCarrieres()
      .subscribe(carrieres => {
        this.careers = carrieres;
        this.filteredCareers = carrieres;
      });
  }

  getCarriereDetails(nom: string): void {
    this.carriereService.getCarriereByNom(nom).subscribe(
      (carriere) => {
        this.selectedCarriere = carriere;
      },
      (error) => {
        console.error('Error fetching carriere details:', error);
      }
    );
  }

  viewCareerDetails(careerName: string): void {
    this.router.navigate(['/career-details', careerName]);
  }

  viewFormationDetails(formationName: string): void {
    this.router.navigate(['/formation-details', formationName]);
  }

  getFormations(): void {
    this.formationService.getAllFormations()
      .subscribe(formations => {
        this.formations = formations;
        this.filteredFormations = this.formations;
      });
  }

  // Add this method to obtain details of the formation
  getFormationDetails(titre: string): void {
    this.formationService.getFormationWithEtablissementsByTitre(titre).subscribe(
      (details) => {
        this.formationDetails = details;
        console.log(this.formationDetails); // add this line to debbug
      },
      (error) => {
        console.error('Error fetching formation details:', error);
      }
    );
  }
}
