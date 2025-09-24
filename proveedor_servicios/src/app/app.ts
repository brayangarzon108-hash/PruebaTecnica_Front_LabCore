import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { ApiResponse } from '../../src/app/models/application/api-response.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('proveedor_servicios');

  constructor(private authService: AuthService) {
    this.generateToken('UserTenkus');
  }

  async generateToken(payload: string) {
    this.authService.generateToken(payload).subscribe({
      next: (response: ApiResponse<string>) => {
        if (response.status === 200) {
          sessionStorage.setItem("SESSION", response.data);
        }
      },
    });
  }
}
