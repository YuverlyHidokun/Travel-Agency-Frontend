import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonToast
} from '@ionic/angular/standalone';
import { API_URL } from 'src/app/config/api';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonToast
  ]
})
export class ComentariosPage implements OnInit {
  paquetes: any[] = [];
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarPaquetesConReseñas();
  }

  cargarPaquetesConReseñas() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<any[]>(`${API_URL}/travel/paquetes`, { headers }).subscribe({
      next: data => {
        this.paquetes = data.filter(p => p.reseñas.length > 0);
      },
      error: err => {
        console.error('Error al cargar paquetes:', err);
      }
    });
  }

  eliminarResena(idPaquete: string, idResena: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.delete(`${API_URL}/travel/paquetes/${idPaquete}/resenas/${idResena}`, { headers }).subscribe({
      next: res => {
        this.cargarPaquetesConReseñas(); // Recarga la lista
      },
      error: err => {
        console.error('Error al eliminar reseña:', err);
      }
    });
  }
}
