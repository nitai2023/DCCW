// 管理接口
import service from './index';
import { loginForm, updateManagerForm, getCommodityForm } from './model';
export const userLoginAPI = (form: loginForm) => {
  return service({
    method: 'POST',
    url: '/login',
    data: form,
  });
};
export const userMessagePreviewinfoAPI = () => {
  return service({
    method: 'GET',
    url: '/user/getMessagePreviewInfo',
  });
};
export const getAllManagerAPI = () => {
  return service({
    method: 'GET',
    url: '/manager/getAllManager',
  });
};
export const updateManagerAPT = (form: updateManagerForm) => {
  return service({
    method: 'PUT',
    url: '/manager/alterManager',
    data: form,
  });
};
export const getCommodityAPI = (form: getCommodityForm) => {
  return service({
    method: 'GET',
    url: '/commodity/getCommodityList',
    params: form,
  });
};
