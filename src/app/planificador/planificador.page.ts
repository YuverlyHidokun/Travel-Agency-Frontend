import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  IonHeader,
  IonTitle } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from 'src/app/config/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-planificador',
  templateUrl: './planificador.page.html',
  styleUrls: ['./planificador.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonButton,
    IonInput,
    IonSelect,
    IonSelectOption
  ]
})
export class PlanificadorPage implements OnInit {

  isLoggedIn = false;
  token = localStorage.getItem('token');
  
  tipoViaje = 'ida';
  origen = '';
  destino = '';
  pasajeros = 1;
  clase = 'economica';
  resultados: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.isLoggedIn = !!this.token;
  }

  buscarViajes() {
    const params = new HttpParams()
      .set('tipo', this.tipoViaje)
      .set('origen', this.origen)
      .set('destino', this.destino)
      .set('clase', this.clase)
      .set('pasajeros', this.pasajeros.toString());

    this.http.get(`${API_URL}/travel/paquetes/buscar`, { params }).subscribe({
      next: (res: any) => {
        this.resultados = res;
      },
      error: err => {
        console.error('Error al buscar viajes', err);
      }
    });
  }
}
