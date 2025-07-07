import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { API_URL } from 'src/app/config/api';
import { RouterModule } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [IonicModule, FormsModule, RouterModule, CommonModule],
})
export class RegisterPage {
  nombre = '';
  apellido = '';
  numero = '';
  email = '';
  password = '';
  acepta_terminos = false;

  fotoPerfil: File | null = null;
  imagenPreview: string | null = null;
  

  backendUrl = `${API_URL}/travel/usuarios/registro`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async seleccionarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      if (image && image.dataUrl) {
        this.imagenPreview = image.dataUrl;

        // Convertir la imagen base64 a archivo tipo File
        const blob = await (await fetch(image.dataUrl)).blob();
        this.fotoPerfil = new File([blob], 'fotoPerfil.jpg', { type: blob.type });
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
    }
  }

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

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('apellido', this.apellido);
    formData.append('numero', this.numero);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('acepta_terminos', String(this.acepta_terminos));

    if (this.fotoPerfil) {
      formData.append('imagen', this.fotoPerfil);
    }

    this.http.post(this.backendUrl, formData).subscribe({
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
