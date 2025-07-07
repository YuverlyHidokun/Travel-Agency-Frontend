import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',        // Cambia esto por un ID único para tu app (ej: com.tuempresa.travelagency)
  appName: 'Travel Agency',               // El nombre que verá el usuario
  webDir: 'www',                    // Carpeta donde está el build de Angular (correcto)
  bundledWebRuntime: false,          // Recomiendo agregar esto para evitar incluir runtime innecesario
  plugins: {
    Camera: {
      photoQuality: 90              // Configuración personalizada para el plugin Camera
    }
  }
};

export default config;
