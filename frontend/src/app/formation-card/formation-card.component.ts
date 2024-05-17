import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formation-card',
  templateUrl: './formation-card.component.html',
  styleUrls: ['./formation-card.component.scss']
})
export class FormationCardComponent {
  @Input() formationName: string;

  constructor() {
    this.formationName = ''; // Initialisation dans le constructeur
  }
}
