import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carriere } from '../model/carriere.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CarriereService {



  constructor(private http: HttpClient, private configService: ConfigService) { }

  getAllCarrieres(): Observable<Carriere[]> {
    return this.http.get<Carriere[]>(`${this.configService.apiUrl}/carrieres/all`);
  }

  getCarriereById(id: number): Observable<Carriere> {
    return this.http.get<Carriere>(`${this.configService.apiUrl}/carrieres/getCarriere/${id}`);
  }
  

 getCarriereByNom(nom: string): Observable<Carriere> {
    return this.http.get<Carriere>(`${this.configService.apiUrl}/carrieres/getCarriereByName/${nom}`);
  }

  addCarriere(carriere: Carriere): Observable<Carriere> {
    console.log('Carriere sent to backend:', carriere); // Ajoutez cette ligne
    return this.http.post<Carriere>(`${this.configService.apiUrl}/carrieres/addCarriere`, carriere);
  }
  
  updateCarriere(id: number, carriere: Carriere): Observable<Carriere> {
    console.log("Données envoyées pour la mise à jour :", carriere);
 
    return this.http.put<Carriere>(`${this.configService.apiUrl}/carrieres/updateCarriere/${id}`, carriere);
  }

  deleteCarriere(id: number): Observable<void> {
    return this.http.delete<void>(`${this.configService.apiUrl}/carrieres/deleteCarriere/${id}`);
  }
}
