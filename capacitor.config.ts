import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'frontend',
  webDir: 'www',
  plugins: {
  Camera: {
    photoQuality: 90
  }
}
};

export default config;
