import { CarriereService } from './../services/carrieres.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Carriere } from '@app/model/carriere.model'; // Importez le modèle Carriere

@Component({
  selector: 'app-career-details',
  templateUrl: './career-details.component.html',
  styleUrls: ['./career-details.component.scss']
})
export class CareerDetailsComponent implements OnInit {
  careerName: string = '';
  careerDetails: Carriere | undefined;

  constructor(
    private route: ActivatedRoute,
    private carriereService: CarriereService
  ) { }

  ngOnInit(): void {
    this.careerName = this.route.snapshot.paramMap.get('careerName') || '';
    this.carriereService.getCarriereByNom(this.careerName).subscribe(
      (data: Carriere) => {
        this.careerDetails = data;
      },
      (error: any) => {
        console.error('Error fetching career details:', error);
      }
    );
  }
}
