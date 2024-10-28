import axios from '@/api/init';
import { UrlString } from '@/types/api';

const api: UrlString = {
  login: '/api/login/v1',
};

/**
 * @name userLogin
 */
export function userLogin(params: {
  phone: string;
}): Promise<HttpResponse.Callback<User.Info>> {
  return new Promise((resolve, reject) => {
    axios
      .get<any, HttpResponse.Callback<User.Info>>(api.login, {
        params,
      })
      .then(res => {
        const { code, message } = res;
        /** 0 为登录成功, 1030:未绑定手机号 */
        if ([0, 1030].includes(code)) {
          resolve(res);
        } else {
          reject(new Error(message));
        }
      })
      .catch(reject);
  });
}
