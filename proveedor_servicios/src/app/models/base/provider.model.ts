export interface PatienstModel {
  id: number;
  typeDocument: number;
  descDocument: string;
  document: string;
  name: string;
  lastName: string;
  birthDate: string;
  cityId: number;
  phone: number;
  email: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  enabled: string;
}

export interface UserFilter {
  username: string;
  rolId: number;
}

export interface DynamicFieldRequest {
  CustomFieldId?: number; // opcional en caso de que aún no exista en BD
  FieldName: string; // nombre del campo     // tipo (text, number, date, etc.)
  FieldValue?: any; // valor actual
  Enabled: boolean; // switch: habilitado/deshabilitado
}

export interface PatienstRequest {
  Id?: number;
  TypeDocument: number;
  Document: string;
  Name: string;
  LastName: string;
  BirthDate: string;
  CityId: number;
  Phone: number;
  Email: string;
  Enabled: boolean; 
}

export interface ServicesRequest {
  ServiceId?: number;
  ProviderId?: number;
  Name: string;
  HourlyRate: number;
  Enabled: boolean;
  Countries: [];
}

export interface ClientsByCountry {
  countryId: number;
  countryName: string;
  clientsCount: number;
}

export interface ServicesByCountry {
  countryId: number;
  countryName: string;
  servicesCount: number;
}

export interface ReportSummary {
  clientsByCountry: ClientsByCountry[];
  servicesByCountry: ServicesByCountry[];
}
