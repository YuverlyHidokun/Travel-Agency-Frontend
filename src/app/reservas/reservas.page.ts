import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
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
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonButtons,
  IonBadge,
  IonText,
  IonDatetime
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/config/api';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

import { ToastController, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: 'reservas.page.html',
  styleUrls: ['reservas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // Ionic standalone components usados en el HTML:
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
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonButtons,
    IonBadge,
    IonText,
    IonDatetime],
    providers: [ToastController, AlertController, NavController]
})
export class ReservasPage implements OnInit {
  reservas: any[] = [];
  paquetesDisponibles: any[] = [];
  mostrarFormularioCrear = false;
  isLoggedIn = false;
  token = localStorage.getItem('token');


  // Para nueva reserva
  nuevaReserva = {
    paqueteId: '',
    pasajeros: 1,
    fechaViaje: ''
  };

  loading = false;

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoggedIn = !!this.token;

    const paqueteIdDesdeURL = this.route.snapshot.queryParamMap.get('paqueteId');

    if (paqueteIdDesdeURL) {
      this.nuevaReserva.paqueteId = paqueteIdDesdeURL;
      this.mostrarFormularioCrear = true;
      this.presentToast('Paquete seleccionado, completa los datos para reservar');
    }

    this.cargarReservas();
    this.cargarPaquetes();
  }

  cargarReservas() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any[]>(`${API_URL}/travel/reservas/mis-reservas`, { headers }).subscribe({
      next: (res) => (this.reservas = res),
      error: (err) => this.presentToast('Error al cargar tus reservas')
    });
  }

  cargarPaquetes() {
    this.http.get<any[]>(`${API_URL}/travel/paquetes/`).subscribe({
      next: (res) => (this.paquetesDisponibles = res),
      error: () => this.presentToast('Error al cargar paquetes')
    });
  }

  async crearReserva() {
    const { paqueteId, fechaViaje, pasajeros } = this.nuevaReserva;
    if (!paqueteId || !fechaViaje || pasajeros < 1) {
      this.presentToast('Completa todos los campos para reservar');
      return;
    }

    this.loading = true;
    const token = localStorage.getItem('token');
    if (!token) {
      this.presentToast('Debes iniciar sesión para reservar');
      this.loading = false;
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      paquete: paqueteId,
      pasajeros,
      fechaViaje
    };

    this.http.post(`${API_URL}/travel/reservas/`, body, { headers }).subscribe({
      next: () => {
        this.loading = false;
        this.presentToast('Reserva creada con éxito');
        this.mostrarFormularioCrear = false;
        this.nuevaReserva = { paqueteId: '', pasajeros: 1, fechaViaje: '' };
        this.cargarReservas();
      },
      error: () => {
        this.loading = false;
        this.presentToast('Error al crear la reserva');
      }
    });
  }

  async editarReserva(reserva: any) {
    // Aquí puedes usar un AlertController para editar directamente
    const alert = await this.alertCtrl.create({
      header: 'Editar Reserva',
      inputs: [
        {
          name: 'pasajeros',
          type: 'number',
          min: 1,
          value: reserva.pasajeros,
          placeholder: 'Pasajeros'
        },
        {
          name: 'fechaViaje',
          type: 'date',
          value: reserva.fechaViaje ? reserva.fechaViaje.split('T')[0] : '',
          placeholder: 'Fecha de viaje'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            this.actualizarReserva(reserva._id, data.pasajeros, data.fechaViaje);
          }
        }
      ]
    });

    await alert.present();
  }

  actualizarReserva(id: string, pasajeros: number, fechaViaje: string) {
    if (!pasajeros || pasajeros < 1 || !fechaViaje) {
      this.presentToast('Datos inválidos para actualizar');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      this.presentToast('Debes iniciar sesión para actualizar');
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { pasajeros, fechaViaje };

    this.http.put(`${API_URL}/travel/reservas/${id}`, body, { headers }).subscribe({
      next: () => {
        this.presentToast('Reserva actualizada');
        this.cargarReservas();
      },
      error: () => this.presentToast('Error al actualizar reserva')
    });
  }

  async confirmarEliminar(reserva: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Quieres eliminar la reserva para ${reserva.paquete.nombre}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.eliminarReserva(reserva._id)
        }
      ]
    });
    await alert.present();
  }

  eliminarReserva(id: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.presentToast('Debes iniciar sesión para eliminar');
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`${API_URL}/travel/reservas/${id}`, { headers }).subscribe({
      next: () => {
        this.presentToast('Reserva eliminada');
        this.cargarReservas();
      },
      error: () => this.presentToast('Error al eliminar reserva')
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
