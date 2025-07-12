import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  ToastController,
  LoadingController,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { API_URL } from 'src/app/config/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    FormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule
  ]
})
export class LoginPage {
  email = '';
  password = '';
  backendUrl = `${API_URL}/travel/usuarios/login`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async login() {
  const loading = await this.loadingCtrl.create({
    message: 'Iniciando sesión...'
  });
  await loading.present();

  this.http.post(this.backendUrl, {
    email: this.email,
    password: this.password
  }).subscribe({
    next: async (res: any) => {
      await loading.dismiss();
      localStorage.setItem('token', res.token);
      localStorage.setItem('rol', res.rol);

      if (res.rol === 'admin') {
        this.router.navigate(['/tabs-admin']);
      } else {
        this.router.navigate(['/tabs']);
      }
    },

    error: async err => {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: err.error?.msg || 'Error al iniciar sesión',
        duration: 3000,
        color: 'danger'
      });
      await toast.present();
    }
  });
}


  entrarComoInvitado() {
    this.router.navigate(['/tabs']);
  }
}
