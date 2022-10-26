import axios from 'axios';

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000,
});

const wallet = {
  walletAddress: localStorage.getItem('myaddress'),
  otype: localStorage.getItem('netType'),
  sign: localStorage.getItem('mysign'),
};
// const wallet = {
//   walletAddress: 'TQr23x4mPP1oH4soAT7w23jWMbXt6x6jVU',
//   otype: 'xxx',
//   sign: '93cd5ea8966b92c9b1050ced45fd5b51'
// }
//请求拦截器
http.interceptors.request.use(
  config => {
    config.data = Object.assign(config.data || {}, wallet);
    return config;
  },
  error => Promise.reject(error)
);

//响应拦截器
http.interceptors.response.use(
  function (res) {
    const { code } = res.data;
    if (code) {
      return Promise.reject(res.data);
    }
    return res.data;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default http;
