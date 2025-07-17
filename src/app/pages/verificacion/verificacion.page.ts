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
  color: 'primary' | 'success' | 'danger' = 'primary';
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      const url = `${API_URL}/travel/verificar/${token}`;

      this.http.get(url).subscribe({
        next: async (res: any) => {
          this.mensaje = res.msg || 'Cuenta verificada con éxito';
          this.color = 'success';
          this.cargando = false;

          const toast = await this.toastCtrl.create({
            message: this.mensaje,
            duration: 3000,
            color: 'success'
          });
          await toast.present();

          // Espera 3 segundos antes de redirigir
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: async err => {
          this.mensaje = err.error?.msg || 'Token inválido o expirado';
          this.color = 'danger';
          this.cargando = false;

          const toast = await this.toastCtrl.create({
            message: this.mensaje,
            duration: 4000,
            color: 'danger'
          });
          await toast.present();
        }
      });
    } else {
      this.mensaje = 'Token no proporcionado';
      this.color = 'danger';
      this.cargando = false;
    }
  }
}
