// 管理接口
import service from '.';
import { loginForm } from './model';
let getToken = () => {
  return localStorage.getItem('token');
};
export const userLoginAPI = (form: loginForm) => {
  return service({
    method: 'POST',
    url: '/login',
    data: form,
  });
};
