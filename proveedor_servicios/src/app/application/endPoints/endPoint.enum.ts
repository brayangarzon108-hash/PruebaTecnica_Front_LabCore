export enum EndPointRoute {
  PROVIDER = 'Provider/GetAllProvider',
  SERVICES = 'Services/GetAllServices',
  TOKEN = 'Public/GenerateToken',
  COUNTRIES = 'Country/GetAllCountry',
  UPSERT_SERVICES = 'Services/UpsertServices',
  UPSERT_PROVIDER = 'Provider/UpsertProvider',
  DASHBOARD = 'ServiceCountry/GetAllServicesCountrySummary',
  UPSERT_MENUS_PERMISSION_PER_ROL = 'Management/UpsertPermissionMenu',
}
