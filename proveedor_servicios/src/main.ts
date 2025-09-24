import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // mantiene tus providers actuales
    provideAnimations()             // ✅ agrega animaciones
  ]
}).catch((err) => console.error(err));
