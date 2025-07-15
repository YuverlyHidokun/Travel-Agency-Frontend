import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

import { API_URL } from 'src/app/config/api';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, NgChartsModule
  ]
})
export class EstadisticasPage implements OnInit {

  token = localStorage.getItem('token');
  totalUsuarios: number = 0;
  totalReservas: number = 0;

  // Datos del gráfico de reservas por estado
  reservaEstadoLabels: string[] = [];
  reservaEstadoData: number[] = [];

  // Datos del gráfico de reservas por mes
  reservaMesLabels: string[] = [];
  reservaMesData: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerEstadisticas();
  }

  obtenerEstadisticas() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<any>(`${API_URL}/travel/estadisticas`, { headers }).subscribe({
      next: data => {
        this.totalUsuarios = data.totalUsuarios;
        this.totalReservas = data.totalReservas;
        this.reservaEstadoLabels = Object.keys(data.reservasPorEstado);
        this.reservaEstadoData = Object.values(data.reservasPorEstado);
        this.reservaMesLabels = data.reservasPorMes.map((r: any) => r.mes);
        this.reservaMesData = data.reservasPorMes.map((r: any) => r.total);
      },
      error: err => console.error('❌ Error al obtener estadísticas:', err)
    });
  }
}
