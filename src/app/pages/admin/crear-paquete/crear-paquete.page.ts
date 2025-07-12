import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonInput, IonItem, IonLabel, IonTextarea, IonButton, IonSelect, IonSelectOption, ToastController, LoadingController
} from '@ionic/angular/standalone';
import { API_URL } from 'src/app/config/api';

@Component({
  selector: 'app-crear-paquete',
  templateUrl: './crear-paquete.page.html',
  styleUrls: ['./crear-paquete.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar,
    IonInput, IonItem, IonLabel, IonTextarea, IonButton,
    IonSelect, IonSelectOption
  ]
})
export class CrearPaquetePage {
  nombre = '';
  descripcion = '';
  precio: number | null = null;
  ubicacion = '';
  origen = '';
  destino = '';
  tipo = 'ida';
  clase = 'economica';
  maxPasajeros: number | null = null;
  imagenes: File[] = [];

  constructor(private http: HttpClient, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {}

  onFileChange(event: any) {
    const selectedFiles: FileList = event.target.files;
    if (selectedFiles.length > 5) {
      this.showToast('Solo puedes subir hasta 5 imágenes');
      return;
    }
    this.imagenes = Array.from(selectedFiles);
  }

  async crearPaquete() {
    if (!this.nombre || !this.descripcion || !this.precio || !this.ubicacion || !this.origen || !this.destino || !this.maxPasajeros) {
      this.showToast('Por favor completa todos los campos requeridos');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Creando paquete...' });
    await loading.present();

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('precio', this.precio.toString());
    formData.append('ubicacion', this.ubicacion);
    formData.append('origen', this.origen);
    formData.append('destino', this.destino);
    formData.append('tipo', this.tipo);
    formData.append('clase', this.clase);
    formData.append('maxPasajeros', this.maxPasajeros.toString());
    this.imagenes.forEach((img, i) => formData.append('imagen', img));

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(`${API_URL}/travel/paquetes/`, formData, { headers }).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.showToast('Paquete creado correctamente', 'success');
        this.resetForm();
      },
      error: async (err) => {
        await loading.dismiss();
        this.showToast('Error al crear paquete');
        console.error(err);
      }
    });
  }

  resetForm() {
    this.nombre = '';
    this.descripcion = '';
    this.precio = null;
    this.ubicacion = '';
    this.origen = '';
    this.destino = '';
    this.tipo = 'ida';
    this.clase = 'economica';
    this.maxPasajeros = null;
    this.imagenes = [];
  }

  async showToast(msg: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({ message: msg, duration: 3000, color });
    toast.present();
  }
}
