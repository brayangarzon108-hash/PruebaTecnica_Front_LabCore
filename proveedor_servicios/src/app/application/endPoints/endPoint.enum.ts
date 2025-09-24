export enum EndPointRoute {
  PATIENTS = 'Patients/GetAllServices',
  SERVICES = 'Services/GetAllServices',
  TOKEN = 'Public/GenerateToken',
  CITIES = 'City/GetAllCity',
  UPSERT_SERVICES = 'Services/UpsertServices',
  UPSERT_PATIENTS = 'Patients/UpsertServices',
  DASHBOARD = 'ServiceCountry/GetAllServicesCountrySummary',
  UPSERT_MENUS_PERMISSION_PER_ROL = 'Management/UpsertPermissionMenu',
}
