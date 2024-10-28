import md5 from 'md5';
import axios from 'axios';
import { getToken } from '@/helper/login';
import logOut from '@/utils/logOut';
import StatusCode, {
  dataCodeOptions,
  logOutStatusCode,
  logOutStatusCodeMap,
} from '@/constants/StatusCode';

/** service基础配置 */
const instance = axios.create({
  baseURL: process.env.API_URL,
  /** 请求超时时间 */
  timeout: 10000,
  headers: {
    'X-API-APPID': 'h51634701a105039d',
  },
});

/** request interceptor */
instance.interceptors.request.use(config => {
  // 设置请求头
  const timestamp = Date.now();
  config.headers['X-API-SIGN'] = `${md5(
    `6ae072b2a68f5bfaee35d50b74f22c8d${timestamp}`
  )},${timestamp}`;
  /** 设置token */
  const token = getToken();
  if (token) {
    config.headers['X-SESSION-TOKEN'] = token;
  }
  return config;
});

instance.interceptors.response.use(
  response => {
    const { data } = response;
    const { code } = data;
    if (code === StatusCode.SUCCESS) {
      return data;
    }
    if ([StatusCode.TOKEN_EXPIRED, StatusCode.DISABLED].includes(code)) {
      setTimeout(() => {
        logOut();
      }, 500);
    }
    return {
      code: data.error || code,
      message: data.message,
      data: dataCodeOptions.includes(code) ? data.data : {},
    };
  },
  err => {
    console.log(err);
    if (logOutStatusCode.includes(err.response.status)) {
      setTimeout(() => {
        logOut();
      }, 500);
      return Promise.reject(
        new Error(
          logOutStatusCodeMap[
            err.response.status as keyof typeof logOutStatusCodeMap
          ]
        )
      );
    }
    return Promise.reject(err);
  }
);

export default instance;
