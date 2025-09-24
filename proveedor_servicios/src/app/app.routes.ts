import { Routes } from '@angular/router';
import { Provider } from './views/provider/provider';
import { Services } from './views/services/services';

export const routes: Routes = [
  { path: '', redirectTo: 'provider', pathMatch: 'full' },
  { path: 'provider', component: Provider },
  { path: 'services', component: Services }
];
