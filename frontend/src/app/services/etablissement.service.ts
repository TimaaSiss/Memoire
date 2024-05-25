import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etablissement } from '@app/model/etablissement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {
  private apiUrl = 'http://localhost:8080/etablissements'; // Remplacez ceci par votre URL backend

  constructor(private http: HttpClient) { }

  getAllEtablissements(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(`${this.apiUrl}/allEtablissements`);
  }

  getEtablissementById(id: number): Observable<Etablissement> {
    return this.http.get<Etablissement>(`${this.apiUrl}/getEtablissement/${id}`);
  }

 // getFormationByTitre(titre: string): Observable<Etablissement> {
  //  return this.http.get<Etablissement>(`${this.apiUrl}/getFormationByTitre/${titre}`);
 // }

  addEtablissement(formation: Etablissement): Observable<Etablissement> {
    return this.http.post<Etablissement>(`${this.apiUrl}/addEtablissement`, formation);
  }

  updateEtablissement(id: number, formation: Etablissement): Observable<Etablissement> {
    return this.http.put<Etablissement>(`${this.apiUrl}/update/${id}`, formation);
  }

  deleteEtablissement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
