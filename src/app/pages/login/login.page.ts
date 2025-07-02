import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { API_URL } from 'src/app/config/api';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    RouterModule
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
        this.router.navigate(['/tabs']);
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
