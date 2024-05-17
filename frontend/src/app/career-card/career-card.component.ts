import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-career-card',
  templateUrl: './career-card.component.html',
  styleUrls: ['./career-card.component.scss']
})
export class CareerCardComponent {
  @Input() careerName: string;

  constructor() {
    this.careerName = ''; // Initialisation dans le constructeur
  }
}
