import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonButton,
  IonButtons,
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { AdminPopoverComponent } from 'src/app/components/admin-popover/admin-popover.component';
import { PopoverController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tabs-admin',
  templateUrl: './tabs-admin.page.html',
  styleUrls: ['./tabs-admin.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonButton,
    IonButtons,

    // 👇 ¡IMPORTANTE! Agrega el popover aquí:
    AdminPopoverComponent
  ]
})
export class TabsAdminPage {
  constructor(
    private router: Router,
    private popoverCtrl: PopoverController
  ) {}

  async abrirPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: AdminPopoverComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
  }
}
