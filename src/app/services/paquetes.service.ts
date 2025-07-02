import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/api';
import { Observable } from 'rxjs';
import { Paquete } from '../models/paquete.model';

@Injectable({ providedIn: 'root' })
export class PaquetesService {
  private baseUrl = `${API_URL}/travel/paquetes`;

  constructor(private http: HttpClient) {}

  getPaquetes(): Observable<Paquete[]> {
    return this.http.get<Paquete[]>(this.baseUrl);
  }

  getPaquetePorId(id: string): Observable<Paquete> {
    return this.http.get<Paquete>(`${this.baseUrl}/${id}`);
  }
}