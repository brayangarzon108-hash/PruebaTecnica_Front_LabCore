import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../environments/enviroments';
import { EndPointRoute } from '../../application/endPoints/endPoint.enum';
import { ApiResponse } from '../../models/application/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticated() {
    const sessionToken = sessionStorage.getItem("SESSION");
    return sessionToken;
  }
  generateToken(user: string) {
    return this.http.get<ApiResponse<any>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.TOKEN}`,
      {
        params: { user: user },
      }
    );
  }
  getToken(): string | null {
    return sessionStorage.getItem("SESSION");
  }
}
