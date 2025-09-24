import { Routes } from '@angular/router';
import { Provider } from './views/provider/provider';
export const routes: Routes = [
  { path: '', redirectTo: 'provider', pathMatch: 'full' },
  { path: 'provider', component: Provider },
];
