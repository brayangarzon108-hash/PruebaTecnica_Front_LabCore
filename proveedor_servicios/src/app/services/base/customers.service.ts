import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../environments/enviroments';
import { EndPointRoute } from '../../application/endPoints/endPoint.enum';
import { ApiResponse } from '../../models/application/api-response.model';
import {
  UserFilter,
  PatienstModel,
  PatienstRequest,
  ServicesRequest,
  ReportSummary
} from '../../models/base/provider.model';
import { ServicesInfo } from '../../models/base/services.model';
@Injectable({
  providedIn: 'root',
})
export class CustomerOrders {
  constructor(private http: HttpClient) {}
  // Patienst List
  getPatienst(payload: string) {
    const token = sessionStorage.getItem('SESSION');
    return this.http.get<ApiResponse<PatienstModel[]>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.PATIENTS}`,
      {
        params: { document: payload },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  }

  // Dashboard List
  getDashboard() {
    const token = sessionStorage.getItem('SESSION');
    return this.http.get<ApiResponse<ReportSummary>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.DASHBOARD}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  }

  // Services List
  getServices(payload: number) {
    const token = sessionStorage.getItem('SESSION');
    return this.http.get<ApiResponse<ServicesInfo[]>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.SERVICES}`,
      {
        params: { providerId: payload },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  }

  // Country List
  getCities() {
    const token = sessionStorage.getItem('SESSION');
    return this.http.get<ApiResponse<any>>(`${enviroments.API_PUBLIC}${EndPointRoute.CITIES}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  // Patients Creation
  upsertPatients(payload: PatienstRequest) {
    const token = sessionStorage.getItem('SESSION');
    return this.http.post<ApiResponse<string>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.UPSERT_PATIENTS}`,
      payload,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  }

  // Services Creation
  upsertServices(payload: ServicesRequest) {
    const token = sessionStorage.getItem('SESSION');
    return this.http.post<ApiResponse<string>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.UPSERT_SERVICES}`,
      payload,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  }
}
