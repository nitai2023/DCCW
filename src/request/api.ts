// 管理接口
import service from './index';
import { loginForm } from './model';
export const userLoginAPI = (form: loginForm) => {
  return service({
    method: 'POST',
    url: '/login',
    data: form,
  });
};
