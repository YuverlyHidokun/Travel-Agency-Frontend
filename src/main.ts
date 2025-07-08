import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { addIcons } from 'ionicons';
import { personOutline, compassOutline, calendarOutline, receiptOutline } from 'ionicons/icons';

addIcons({
  'person-outline': personOutline,
  'compass-outline': compassOutline,
  'calendar-outline': calendarOutline,
  'receipt-outline': receiptOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(HttpClientModule)  // ✅ CORRECTO
  ],
});
