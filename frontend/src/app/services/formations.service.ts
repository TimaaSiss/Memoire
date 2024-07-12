import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '@app/model/formation.model';
import { Course } from '@app/model/cours.model';
import { ConfigService } from './config.service';
import { Carriere } from '@app/model/carriere.model';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  
  constructor(private http: HttpClient, private configService: ConfigService) { }

  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.configService.apiUrl}/formations/allFormations`);
  }

  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.configService.apiUrl}/formations/getFormation/${id}`);
  }

  getCarriereByFormation(formationId: number): Observable<Carriere[]> {
    return this.http.get<Carriere[]>(`${this.configService.apiUrl}/formations/${formationId}/carrieres`);
  }

  getFormationWithEtablissementsByTitre(titre: string): Observable<Formation> {
    return this.http.get<Formation>(`${this.configService.apiUrl}/formations/getFormationByTitre/${encodeURIComponent(titre)}`);
  }

  addFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.configService.apiUrl}/formations/add`, formation);
  }

  updateFormation(id: number, formation: Formation): Observable<Formation> {
    return this.http.put<Formation>(`${this.configService.apiUrl}/formations/update/${id}`, formation);
  }

  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.configService.apiUrl}/formations/delete/${id}`);
  }

  getFormationCount(): Observable<number> {
    return this.http.get<number>(`${this.configService.apiUrl}/formations/count`);
  }
  
}
