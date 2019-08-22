import axios from 'axios'
import { Message } from 'element-ui'
import Qs from 'qs'
let request = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "" : "https://product", // api 的 base_url
  timeout: 5000, // request timeout
  //#config里面有这个transformRquest，这个选项会在发送参数前进行处理。
  //#这时候我们通过Qs.stringify转换为表单查询参数
  transformRequest: [function (data) {
    data = Qs.stringify(data);
    return data;
  }],
  //#设置Content-Type
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})
request.interceptors.request.use(
  request => {
    return request
  },
  err => {
    Promise.reject(err)
  }
)
request.interceptors.response.use(
  response => response,
  err => {
    Message({
      message: err.message,
      type: 'err',
      duration: 5 * 1000
    })
    return Promise.reject(err)
  }
)
export default request;