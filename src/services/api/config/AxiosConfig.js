import { GLOBAL_URL } from '~/global/config';

// Token
const token = localStorage.getItem('token');

export default class AxiosConfig {
  static config = {
    baseURL: GLOBAL_URL,
    timeout: 20000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : null,
      'Content-Type': 'application/json',
    },
    responseType: 'json',
    crossDomain: true,
  };

  static changeConfig = (config) => {
    return { ...this.config, ...config };
  };
}
