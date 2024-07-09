import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etablissement } from '@app/model/etablissement.model';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getAllEtablissements(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(`${this.configService.apiUrl}/etablissements`);
  }

  getEtablissementById(id: number): Observable<Etablissement> {
    return this.http.get<Etablissement>(`${this.configService.apiUrl}/etablissements/${id}`);
  }

 // getFormationByTitre(titre: string): Observable<Etablissement> {
  //  return this.http.get<Etablissement>(`${this.apiUrl}/getFormationByTitre/${titre}`);
 // }

  addEtablissement(formation: Etablissement): Observable<Etablissement> {
    return this.http.post<Etablissement>(`${this.configService.apiUrl}/etablissements`, formation);
  }

  updateEtablissement(id: number, formation: Etablissement): Observable<Etablissement> {
    return this.http.put<Etablissement>(`${this.configService.apiUrl}/etablissements/update/${id}`, formation);
  }

  deleteEtablissement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.configService.apiUrl}/etablissements/delete/${id}`);
  }
}
