import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
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
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  imports: [
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
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class ResetPasswordPage implements OnInit {
  password: string = '';
  confirmpassword: string = '';
  token: string = '';
  tokenValido: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toast: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const token = params.get('token');
      const valid = params.get('valid');
      
      if (!token || valid !== 'true') {
        this.presentToast('Token inválido o expirado', 'danger');
        this.router.navigate(['/login']);
        return;
      }

      this.token = token;
      this.tokenValido = true; // Ya validado por backend
    });
  }

  async cambiarPassword() {
    if (!this.password || !this.confirmpassword) {
      return this.presentToast('Todos los campos son obligatorios', 'warning');
    }

    if (this.password !== this.confirmpassword) {
      return this.presentToast('Las contraseñas no coinciden', 'danger');
    }

    try {
      const res: any = await this.http.post(
        `https://travel-agency-backend-dn6i.onrender.com/travel/usuarios/recuperar-password/${this.token}`,
        { password: this.password, confirmpassword: this.confirmpassword }
      ).toPromise();

      await this.presentToast(res.msg, 'success');
      this.router.navigate(['/login']);
    } catch (err: any) {
      await this.presentToast(err.error?.msg || 'Error al actualizar la contraseña', 'danger');
    }
  }

  private async presentToast(message: string, color: string) {
    const t = await this.toast.create({
      message,
      duration: 3000,
      color
    });
    t.present();
  }
}
