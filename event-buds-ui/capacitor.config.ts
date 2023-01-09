import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'EventBuds.UI',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    androidScheme: "http",
    allowNavigation: [
      "140.238.138.230"
    ]
  }
};

export default config;
