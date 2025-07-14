import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonLabel, IonTitle, IonToolbar, ToastController, LoadingController, AlertController, IonText } from '@ionic/angular/standalone';
import { API_URL } from 'src/app/config/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.page.html',
  styleUrls: ['./paquetes.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonLabel,
    IonButton,
    IonText
  ]
})
export class PaquetesPage implements OnInit {
  paquetes: any[] = [];
  loading = false;

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerPaquetes();
  }

  async obtenerPaquetes() {
    this.loading = true;
    try {
      const res: any = await this.http.get(`${API_URL}/travel/paquetes/`).toPromise();
      this.paquetes = res;
    } catch (err) {
      this.mostrarToast('Error al obtener paquetes');
    } finally {
      this.loading = false;
    }
  }

  editarPaquete(paqueteId: string) {
        this.router.navigate(['../crear-paquete'], {
      relativeTo: this.route,
      queryParams: { id: paqueteId }
    });
  }

  async eliminarPaquete(id: string) {
  const alert = await this.alertCtrl.create({
    header: 'Confirmar',
    message: '¿Estás seguro de que deseas eliminar este paquete?',
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Eliminar',
        handler: async () => {
          try {
            const token = localStorage.getItem('token');
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
            await this.http.delete(`${API_URL}/travel/paquetes/${id}`, { headers }).toPromise();
            this.mostrarToast('Paquete eliminado');
            this.obtenerPaquetes();
          } catch (err) {
            console.error(err);
            this.mostrarToast('Error al eliminar el paquete');
          }
        }
      }
    ]
  });
  await alert.present();
}


  async mostrarToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2500,
      color: 'primary'
    });
    toast.present();
  }
}
