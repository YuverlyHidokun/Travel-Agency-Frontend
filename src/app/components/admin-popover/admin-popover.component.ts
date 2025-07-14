import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, PopoverController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/config/api';

@Component({
  selector: 'app-admin-popover',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './admin-popover.component.html',
  styleUrls: ['./admin-popover.component.scss'],
})
export class AdminPopoverComponent implements OnInit {
  usuario: any = null;

  constructor(
    private http: HttpClient,
    private popoverCtrl: PopoverController,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerPerfil();
  }

  obtenerPerfil() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(`${API_URL}/travel/usuarios/perfil`, { headers }).subscribe({
      next: (res: any) => {
        this.usuario = res.usuario || res;
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
      }
    });
  }

  irAlPerfil() {
    this.popoverCtrl.dismiss();
    this.router.navigate(['/tabs-admin/perfil']);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.popoverCtrl.dismiss();
    this.router.navigate(['/login']);
  }
}
