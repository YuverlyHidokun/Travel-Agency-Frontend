import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
  imports: [
    // Ionic components
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    // Angular modules
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
})
export class RecuperarPasswordPage {
  email: string = '';

  constructor(
    private http: HttpClient,
    private toast: ToastController,
    private nav: NavController
  ) {}

  async enviarCorreo() {
    if (!this.email) {
      const toast = await this.toast.create({
        message: 'Por favor ingresa tu correo electrónico',
        duration: 3000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    try {
      const res: any = await this.http.post(
        'https://travel-agency-backend-dn6i.onrender.com/travel/usuarios/recuperar-password',
        { email: this.email }
      ).toPromise();

      const toast = await this.toast.create({
        message: res.msg,
        duration: 3000,
        color: 'success'
      });
      await toast.present();

      this.nav.navigateRoot('/login');
    } catch (err: any) {
      const toast = await this.toast.create({
        message: err.error?.msg || 'Error al enviar el correo',
        duration: 3000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}
