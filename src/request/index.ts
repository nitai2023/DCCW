// 封装axios
import axios from 'axios';
import QS from 'qs';
export const baseURL = 'http://8.137.11.172:7121axios.create';
const service = axios.create({
  baseURL: 'http://8.137.11.172:7121', // 设置默认的请求地址
  timeout: 5000, // 设置默认的超时时间
});
service.interceptors.request.use(
  (config) => {
    // 每次发送请求之前本地存储中是否存在token，也可以通过Redux这里只演示通过本地拿到token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token =
      window.localStorage.getItem('userToken') ||
      window.sessionStorage.getItem('userToken');
    //在每次的请求中添加token
    config.data = Object.assign({}, config.data, {
      token: token,
    });
    //设置请求头
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };
    config.data = QS.stringify(config.data);
    return config;
  },
  (error) => {
    return error;
  }
);
//响应拦截器
service.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response.data;
  } else {
    return response;
  }
});
//最后把封装好的axios导出
export default service;
