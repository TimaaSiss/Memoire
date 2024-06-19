import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from '@app/model/formation.model';
import { FormationService } from '@app/services/formations.service';
import { Course } from '@app/model/cours.model'; // Assurez-vous d'importer le modèle de Cours

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss']
})
export class FormationDetailsComponent implements OnInit {
  formationName: string = '';
  formationDetails: Formation | undefined;
  coursList: Course[] = []; // Liste des cours associés à la formation

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService
  ) { }

  ngOnInit(): void {
    this.formationName = this.route.snapshot.paramMap.get('formationName') || '';
    console.log('Formation name:', this.formationName);
    if (this.formationName) {
      // Récupérer les détails de la formation
      this.formationService.getFormationWithEtablissementsByTitre(this.formationName).subscribe(
        (data: Formation) => {
          this.formationDetails = data;
          console.log('Formation details:', this.formationDetails);

          // Une fois que les détails de la formation sont récupérés, récupérer les cours associés
          this.formationService.getCoursByFormation(this.formationName).subscribe(
            (cours: Course[]) => {
              this.coursList = cours;
              console.log('Cours associés:', this.coursList);
            },
            (error: any) => {
              console.error('Error fetching associated courses:', error);
            }
          );
        },
        (error: any) => {
          console.error('Error fetching formation details:', error);
        }
      );
    }
  }
}
