import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule, ToastController } from '@ionic/angular';
import { API_URL } from 'src/app/config/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verificacion',
  standalone: true,
  templateUrl: './verificacion.page.html',
  styleUrls: ['./verificacion.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class VerificacionPage {
  mensaje = 'Verificando...';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      const url = `${API_URL}/travel/usuarios/verificar/${token}`;

      this.http.get(url).subscribe({
        next: async (res: any) => {
          this.mensaje = res.msg || 'Cuenta verificada con éxito';
          const toast = await this.toastCtrl.create({
            message: this.mensaje,
            duration: 3000,
            color: 'success'
          });
          await toast.present();
          this.router.navigate(['/login']);
        },
        error: async err => {
          this.mensaje = err.error?.msg || 'Token inválido o expirado';
          const toast = await this.toastCtrl.create({
            message: this.mensaje,
            duration: 3000,
            color: 'danger'
          });
          await toast.present();
        }
      });
    } else {
      this.mensaje = 'Token no proporcionado';
    }
  }
}
