// JWT imports
import jwt from 'jsonwebtoken';

// Global variables imports
import { JWT_SECRET } from '~/global/config';

// Redux imports
import store from '~/store';
import { Creators as AuthActions } from '~/store/ducks/Auth';
import { Creators as UserActions } from '~/store/ducks/User';
import AxiosConfig from '~/services/api/config/AxiosConfig';

export const saveToken = (token) => {
  if (token) {
    AxiosConfig.config.headers.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  }
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const checkAuth = () => {
  const token = localStorage.getItem('token');

  try {
    AxiosConfig.config.headers.Authorization = `Bearer ${token}`;
    jwt.verify(token, JWT_SECRET);
    const { id, name, email } = jwt.decode(token);

    store.dispatch(AuthActions.authSuccess(token));
    store.dispatch(UserActions.saveUser(id, name, email));
    return true;
  } catch (error) {
    console.log(error);
    store.dispatch(AuthActions.authFail());
    localStorage.removeItem('token');
    return false;
  }
};
