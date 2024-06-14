import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from '@app/model/formation.model';
import { FormationService } from '@app/services/formations.service';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss']
})
export class FormationDetailsComponent implements OnInit {
  formationName: string = '';
  formationDetails: Formation | undefined;

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService
  ) { }

  ngOnInit(): void {
    this.formationName = this.route.snapshot.paramMap.get('formationName') || '';
    console.log('Formation name:', this.formationName);
    if (this.formationName) {
        this.formationService.getFormationWithEtablissementsByTitre(this.formationName).subscribe(
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
