import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';


import { API_URL } from 'src/app/config/api';


@Component({
  selector: 'app-detalle-paquete',
  templateUrl: './detalle-paquete.page.html',
  styleUrls: ['./detalle-paquete.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
  ]
})
export class DetallePaquetePage {
  paquete: any = null;
  comentario: string = '';
  calificacion: number = 0;
  token: string | null = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.token = localStorage.getItem('token');
    this.obtenerPaquete(id!);
  }

  obtenerPaquete(id: string) {
    this.http.get(`${API_URL}/travel/paquetes/${id}`).subscribe({
      next: (res: any) => {
        this.paquete = res;
        this.paquete.resenas = res['reseñas']; // renombra si hay problemas con "ñ"
      },
      error: err => {
        console.error('Error al obtener paquete', err);
      }
    });
  }

  enviarResena() {
    if (!this.comentario || !this.calificacion) return;
    const id = this.paquete._id;

    this.http.post(
      `${API_URL}/travel/paquetes/${id}/resenas`,
      {
        comentario: this.comentario,
        calificacion: this.calificacion
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    ).subscribe({
      next: res => {
        alert('¡Gracias por tu reseña!');
        this.comentario = '';
        this.calificacion = 0;
        this.obtenerPaquete(id);
      },
      error: err => {
        console.error('Error al enviar reseña', err);
      }
    });
  }
}
