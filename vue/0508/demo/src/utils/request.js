import axios from "axios";
import { Message } from "element-ui";
import qs from "qs"
// import { delCookie } from "@/utils/cookie";

const request = axios.create({
  timeout: 5000,
});
request.interceptors.request.use(
  (config) => {
    process.env.NODE_ENV!=="development"?config.url = "/cgi-bin/web.cgi":false;
    config.data = qs.stringify(config.data);
    process.env.NODE_ENV==="development"?console.log(config.data):false;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
request.interceptors.response.use(
  (response) => {
    if (typeof(response.data.ret)!="undefined" && +response.data.ret !== 0 ) {
      Message({
        message: response.data.ret,
        type: "error",
        duration: 5 * 1000,
      })
      return Promise.reject('')
    } else {
      return response.data
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default request;
