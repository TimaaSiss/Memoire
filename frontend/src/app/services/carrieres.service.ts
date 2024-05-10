import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carriere } from '../model/carriere.model';

@Injectable({
  providedIn: 'root'
})
export class CarriereService {

  private baseUrl = 'http://localhost:8080/carrieres';

  constructor(private http: HttpClient) { }

  getAllCarrieres(): Observable<Carriere[]> {
    return this.http.get<Carriere[]>(`${this.baseUrl}/allCarrieres`);
  }

  getCarriereById(id: number): Observable<Carriere> {
    return this.http.get<Carriere>(`${this.baseUrl}/getCarriere/${id}`);
  }

  addCarriere(carriere: Carriere): Observable<Carriere> {
    return this.http.post<Carriere>(`${this.baseUrl}/addCarriere`, carriere);
  }

  updateCarriere(id: number, carriere: Carriere): Observable<Carriere> {
    console.log("Données envoyées pour la mise à jour :", carriere);
 
    return this.http.put<Carriere>(`${this.baseUrl}/updateCarriere/${id}`, carriere);
  }

  deleteCarriere(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteCarriere/${id}`);
  }
}
