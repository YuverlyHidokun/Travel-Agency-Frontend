import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonicModule } from '@ionic/angular';
import { PaquetesService } from '../services/paquetes.service';
import { Paquete } from '../models/paquete.model';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ExplorarPage implements OnInit {
  paquetes: Paquete[] = [];

  constructor(private paquetesService: PaquetesService) {}

  ngOnInit() {
    this.paquetesService.getPaquetes().subscribe((data) => {
      this.paquetes = data;
    });
  }
}