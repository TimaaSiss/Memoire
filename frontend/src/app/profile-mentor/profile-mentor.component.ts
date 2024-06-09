import { Component, OnInit } from '@angular/core';
import { Mentor } from '@app/model/mentor.model';
import { MentorService } from '@app/services/mentors.service';

@Component({
  selector: 'app-mentor-profile',
  templateUrl: './profile-mentor.component.html',
  styleUrls: ['./profile-mentor.component.scss']
})
export class MentorProfileComponent implements OnInit {
  prenom: string = "";
  nom: string = "";
  mail: string = "";
  specialite: string = "";
  
  constructor(private mentorService: MentorService) { }

  ngOnInit(): void {
    // Récupérer l'utilisateur connecté depuis le localStorage
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      console.log('currentUser:', currentUser); // Vérifiez si l'utilisateur est récupéré correctement
      
      this.prenom = currentUser.prenom || ''; // Assurez-vous de vérifier si les propriétés existent
      this.nom = currentUser.nom || '';
      this.mail = currentUser.mail || '';
  
      if (currentUser.specialite) {
        this.mentorService.getMentorById(currentUser.id).subscribe(
          (mentorDetails: Mentor) => {
            console.log('mentorDetails:', mentorDetails); // Vérifiez si les détails du mentor sont récupérés correctement
            this.specialite = mentorDetails.specialite || '';
          },
          (error) => {
            console.error('Erreur lors de la récupération des détails du mentor : ', error);
          }
        );
      } 
    } 
  }
}
