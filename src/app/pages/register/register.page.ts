import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { API_URL } from 'src/app/config/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [IonicModule, FormsModule, RouterModule],
})
export class RegisterPage {
  nombre = '';
  apellido = '';
  numero = '';
  email = '';
  password = '';
  acepta_terminos = false;

  backendUrl = `${API_URL}/travel/usuarios/registro`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async registrar() {
    if (!this.acepta_terminos) {
      const toast = await this.toastCtrl.create({
        message: 'Debes aceptar los términos y condiciones.',
        duration: 3000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Registrando usuario...'
    });
    await loading.present();

    const body = {
      nombre: this.nombre,
      apellido: this.apellido,
      numero: this.numero,
      email: this.email,
      password: this.password,
      acepta_terminos: String(this.acepta_terminos)
    };

    this.http.post(this.backendUrl, body).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: res.msg || 'Registro exitoso',
          duration: 3000,
          color: 'success'
        });
        await toast.present();
        this.router.navigate(['/login']);
      },
      error: async err => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: err.error?.msg || 'Error al registrar',
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }

  irATerminos() {
    this.router.navigate(['/terminos']);
  }
}
