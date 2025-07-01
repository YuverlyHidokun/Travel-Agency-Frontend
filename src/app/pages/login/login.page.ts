import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // ← necesario para ngModel

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class LoginPage {
  email = '';
  password = '';
  backendUrl = 'https://travel-agency-backend-o18s.onrender.com/travel/usuarios/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  async login() {
    const loading = document.createElement('ion-loading');
    loading.message = 'Iniciando sesión...';
    document.body.appendChild(loading);
    await loading.present();

    this.http.post(this.backendUrl, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: async (res: any) => {
        loading.dismiss();
        localStorage.setItem('token', res.token);
        this.router.navigate(['/tabs']);
      },
      error: async err => {
        loading.dismiss();
        const toast = document.createElement('ion-toast');
        toast.message = err.error?.msg || 'Error al iniciar sesión';
        toast.duration = 3000;
        toast.color = 'danger';
        document.body.appendChild(toast);
        await toast.present();
      }
    });
  }

  entrarComoInvitado() {
    this.router.navigate(['/tabs']);
  }
}
