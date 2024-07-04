import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user-service.service';
import { CourseService } from '@app/services/cours.service';
import { FormationService } from '@app/services/formations.service';
import { CarriereService } from '@app/services/carrieres.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userCount = 0;
  courseCount = 0;
  formationCount = 0;
  carriereCount=0;

  constructor(private userService: UserService,
              private courseService: CourseService,
              private formationService: FormationService,
              private carriereService: CarriereService) { }

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    this.userService.getUserCount().subscribe(
      count => this.userCount = count,
      error => console.error('Erreur lors de la récupération du nombre d\'utilisateurs : ', error)
    );

    this.courseService.getCourseCount().subscribe(
      count => this.courseCount = count,
      error => console.error('Erreur lors de la récupération du nombre de cours : ', error)
    );

    this.formationService.getFormationCount().subscribe(
      count => this.formationCount = count,
      error => console.error('Erreur lors de la récupération du nombre de formations : ', error)
    );

    this.carriereService.getCount().subscribe(
      count => this.carriereCount = count,
      error => console.error('Erreur lors de la récupération du nombre de formations : ', error)
    );
  }
}
