
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9f8253f77c1745da9dc7d713f45601b6',
  appName: 'HospitalFinder',
  webDir: 'dist',
  server: {
    url: 'https://9f8253f7-7c17-45da-9dc7-d713f45601b6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Geolocation: {
      permissions: ['location']
    }
  }
};

export default config;
