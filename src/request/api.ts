// 管理接口
import service from './index';
import {
  loginForm,
  updateManagerForm,
  getCommodityForm,
  getCommodityByCategoryForm,
  deleteCommodityByIdForm,
  addCouponForm,
  getSaleSpecificationsForm,
  deleteCouponByIdForm,
} from './model';
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
export const getCategoryAPI = () => {
  return service({
    method: 'GET',
    url: '/commodity/getCategory',
  });
};
export const getCommodityByCategoryAPI = (form: getCommodityByCategoryForm) => {
  return service({
    method: 'GET',
    url: '/commodity/getCommodityByCategory',
    params: form,
  });
};
export const deleteCommodityByIdAPI = (form: deleteCommodityByIdForm) => {
  return service({
    method: 'DELETE',
    url: '/commodity/deleteCommodity',
    params: form,
  });
};
export const getVipListAPI = () => {
  return service({
    method: 'GET',
    url: '/dict-vip-level/getVipList',
  });
};
export const addCouponAPI = (form: addCouponForm) => {
  return service({
    method: 'POST',
    url: '/coupon/publishCoupon',
    data: form,
  });
};
export const getSaleSpecificationsAPI = (form: getSaleSpecificationsForm) => {
  return service({
    method: 'GET',
    url: '/sale-specification/getSaleSpecifications',
    params: form,
  });
};
export const getCouponListAPI = () => {
  return service({
    method: 'GET',
    url: '/coupon/managerGetCouponList',
  });
};
export const deleteCouponByIdAPI = (form: deleteCouponByIdForm) => {
  return service({
    method: 'DELETE',
    url: '/coupon/deleteCoupon',
    params: form,
  });
};
