import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from '@app/model/formation.model';
import { FormationService } from '@app/services/formations.service';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss']
})
export class FormationDetailsComponent {
  formationName: string = '';
  formationId: number= 1;
  formationDetails: Formation | undefined;

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService
  ) { }

  ngOnInit(): void {
    const formationName = this.route.snapshot.paramMap.get('formationName');
    console.log('Formation name:', formationName);
    if (formationName) {
      this.formationService.getFormationWithEtablissementsByTitre(formationName).subscribe(
        (data: Formation) => {
          this.formationDetails = data;
          console.log('Formation details:', this.formationDetails);
        },
        (error: any) => {
          console.error('Error fetching formation details:', error);
        }
      );
    }
  }
  }
  
