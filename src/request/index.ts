// 封装axios
import axios from 'axios';
export const baseURL = 'http://8.137.11.172:7121';
const service = axios.create({
  baseURL: baseURL, // 设置默认的请求地址
  timeout: 5000, // 设置默认的超时时间
});
// let httpCode = {
//   //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
//   400: '请求参数错误',
//   401: '权限不足, 请重新登录',
//   403: '服务器拒绝本次访问',
//   404: '请求资源未找到',
//   500: '内部服务器错误',
//   501: '服务器不支持该请求中使用的方法',
//   502: '网关错误',
//   504: '网关超时',
// };
service.interceptors.request.use(
  (config) => {
    // 每次发送请求之前本地存储中是否存在token，也可以通过Redux这里只演示通过本地拿到token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token =
      window.localStorage.getItem('userToken') ||
      window.sessionStorage.getItem('userToken');
    //在每次的请求中添加token
    if (token) {
      config.headers['Authorization'] = token;
    }
    // //设置请求头
    // config.headers['Content-Type'] =
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return error;
  }
);
//响应拦截器
service.interceptors.response.use((response) => {
  if (response.status == 200) {
    if (response.data.success == false) {
      showSnackbar(response.data.errorMsg);
    } else {
      return response.data;
    }
  } else {
    return response;
  }
});
let showSnackbar: (message: string) => void;

export const setSnackbarHandler = (handler: (message: string) => void) => {
  showSnackbar = handler;
};

//最后把封装好的axios导出
export default service;
