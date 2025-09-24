export interface ProviderModel {
  providerId: number;
  taxId: string;
  name: string;
  email: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  enabled: string;
  customFields: ProviderCustomFieldResponse[]
}

export interface ProviderCustomFieldResponse {
  customFieldId: number;
  fieldName: string;
  fieldValue: number;
  enabled: boolean
}

export interface UserFilter {
  username: string;
  rolId: number;
}

export interface DynamicFieldRequest {
  CustomFieldId?: number;           // opcional en caso de que aún no exista en BD
  FieldName: string;          // nombre del campo     // tipo (text, number, date, etc.)
  FieldValue?: any;           // valor actual
  Enabled: boolean;      // switch: habilitado/deshabilitado
}

export interface ProviderRequest {
  ProviderId?: number;
  TaxId: string;
  Name: string;
  Email: string;
  Enabled: boolean; // switch: proveedor habilitado/deshabilitado
  dynamicFields: DynamicFieldRequest[];
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