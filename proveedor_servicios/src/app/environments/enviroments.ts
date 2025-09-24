const HOST = 'https://localhost:44300/api';
export const enviroments = {
  API_PUBLIC: HOST + '/',
  production: false,
  context: 'develop',
  version: "1.1",
  minutesInactive: 30,
  minutesToRefresh: 5,
};