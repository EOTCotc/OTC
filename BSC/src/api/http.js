import axios from 'axios'

const http = axios.create({
  // baseURL: 'http://192.168.0.21:5555/',
  baseURL: 'https://didapi.eotc.me',
  timeout: 10000,
})


//请求拦截器
http.interceptors.request.use(
  (config) => {
    const wallet = {
      walletAddress: localStorage.getItem('myaddress'),
      otype: localStorage.getItem('netType'),
      sign: localStorage.getItem('mysign'),
    }
    config.data = Object.assign(config.data || {}, wallet)
    return config
  },
  (error) => Promise.reject(error)
)

//响应拦截器
http.interceptors.response.use(
  function (res) {
    const { code, items } = res.data
    if (code) {
      return Promise.reject(items)
    }
    return res.data
  },
  function (err) {
    return Promise.reject(err)
  }
)

export default http
