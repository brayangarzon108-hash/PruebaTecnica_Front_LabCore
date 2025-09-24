export interface ApiResponseReceived {
  estado: number;
  datos: string;
  mensaje: string;
}

export class ApiResponse<T> {
  status: number;
  data: T;
  message: string;

  constructor(payload: ApiResponseReceived) {
    this.status = payload.estado;
    this.data = <T>payload.datos;
    this.message = payload.mensaje;
  }
}
