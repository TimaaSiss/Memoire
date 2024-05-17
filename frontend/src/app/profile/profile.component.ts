import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string = ""; // Variable pour stocker le nom de l'utilisateur
  progress: number = 5;
  careers: {nom:string; img:string}[] = [{nom:'Comptabilité',img:'compta.jpg'}, {nom:'Développement Web',img:'dev.jpg'}, {nom:'Juriste', img:'juge.jpg'}, {nom:'Dentiste',img:'dentiste.jpg'}, {nom:'Hotellerie',img:'hote.jpg'}, {nom:'Police',img:'police.jpg'}]; // Ajoutez les noms des carrières et leurs images
  formations: string[] = ['Finance', 'Informatique', 'Mecanique', 'Electronique', 'Adressage IP', 'Agriculture', 'Journalisme']; // Ajoutez les noms des formations

  filteredCareers: {nom:string; img:string}[] = []; // Tableau pour stocker les carrières filtrées
  searchTerm: string = ''; // Variable pour stocker le terme de recherche
  filteredFormations: string[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // Obtenir les informations de l'utilisateur connecté lors de l'initialisation du composant
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString); // Supposons que vous stockez les informations de l'utilisateur dans le local storage après la connexion
      this.username = currentUser.username; // Récupérez le nom de l'utilisateur connecté et stockez-le dans la variable
    } else {
      this.username = ''; // Si aucune donnée utilisateur n'est présente dans le localStorage, initialisez la variable à une chaîne vide
    }

    // Initialisez le tableau des carrières filtrées avec toutes les carrières au début
    this.filteredCareers = this.careers;

    // Initialisez le tableau des formations filtrées avec toutes les formations au début
    this.filteredFormations = this.formations;
  }

  // Méthode pour filtrer les carrières en fonction du terme de recherche
  filterCareers(): void {
    if (this.searchTerm.trim() === '') {
      // Si la barre de recherche est vide, affichez toutes les carrières
      this.filteredCareers = this.careers;
    } else {
      // Sinon, filtrez les carrières en fonction du terme de recherche
      this.filteredCareers = this.careers.filter(career => career.nom.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }
  
  // Méthode pour filtrer les formations en fonction du terme de recherche
  filterFormations(): void {
    if (this.searchTerm.trim() === '') {
      // Si la barre de recherche est vide, affichez toutes les formations
      this.filteredFormations = this.formations;
    } else {
      // Sinon, filtrez les formations en fonction du terme de recherche
      this.filteredFormations = this.formations.filter(formation => formation.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }

  startQuestionnaire() {
    // Ajoutez votre logique pour commencer le questionnaire ici
  }

  navigateToQuestionPage(): void {
    this.router.navigate(['/questionnaires/:id']); // Spécifiez le chemin de la nouvelle page ('/questions' est un exemple, remplacez-le par le chemin réel de votre page)
  }
}
