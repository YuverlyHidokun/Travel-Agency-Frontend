import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController, AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/config/api';
import { EditarPerfilModal } from '../modals/editar-perfil.modal';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PerfilPage implements OnInit {
  usuario: any = null;
  token = localStorage.getItem('token');

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.obtenerPerfil();
  }

  async obtenerPerfil() {
    if (!this.token) {
      this.presentToast('No hay sesión activa');
      this.navCtrl.navigateRoot('/login');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    this.http.get(`${API_URL}/travel/usuarios/perfil`, { headers }).subscribe({
      next: (res: any) => {
        this.usuario = res.usuario || res;
      },
      error: err => {
        console.error(err);
        this.presentToast('Error al obtener perfil');
      }
    });
  }

  async cerrarSesion() {
    localStorage.removeItem('token');
    this.presentToast('Sesión cerrada');
    this.navCtrl.navigateRoot('/login');
  }

  async cambiarFotoPerfil() {
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.accept = 'image/*';

    imageInput.onchange = async () => {
      const file = imageInput.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('imagen', file);

      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      this.http.put(`${API_URL}/travel/usuarios/actualizar-foto`, formData, { headers })
        .subscribe({
          next: async (res: any) => {
            this.presentToast(res.msg || 'Imagen actualizada');
            this.obtenerPerfil(); // refresca el perfil
          },
          error: err => {
            console.error(err);
            this.presentToast('Error al actualizar imagen');
          }
        });
    };

    imageInput.click();
  }

  async abrirModalEditar() {
    const modal = await this.modalCtrl.create({
      component: EditarPerfilModal,
      componentProps: {
        usuario: this.usuario
      }
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data) {
        this.obtenerPerfil(); // recarga el perfil
      }
    });

    await modal.present();
  }

  async abrirModalPassword() {
    const alert = await this.alertCtrl.create({
      header: 'Cambiar contraseña',
      inputs: [
        {
          name: 'nuevopassword',
          type: 'password',
          placeholder: 'Nueva contraseña'
        },
        {
          name: 'confirmarpassword',
          type: 'password',
          placeholder: 'Confirmar contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cambiar',
          handler: data => this.cambiarPassword(data)
        }
      ]
    });

    await alert.present();
  }

  cambiarPassword(data: any) {
    const { nuevopassword, confirmarpassword } = data;

    if (!nuevopassword || !confirmarpassword || nuevopassword !== confirmarpassword) {
      this.presentToast('Las contraseñas no coinciden');
      return;
    }

    const body = {
      id: this.usuario?._id,
      nuevopassword,
      confirmarpassword
    };

    this.http.post(`${API_URL}/travel/usuarios/actualizar-password`, body).subscribe({
      next: async res => {
        this.presentToast('Contraseña actualizada correctamente');
      },
      error: err => {
        console.error(err);
        this.presentToast('Error al actualizar contraseña');
      }
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
