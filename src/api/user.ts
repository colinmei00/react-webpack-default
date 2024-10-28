import axios from '@/api/init';
import { UrlString } from '@/types/api';

const api: UrlString = {
  userInfo: '/api/user/info',
};

/**
 * @name getUserInfo
 * @returns Promise<User.Info>
 * @description 获取用户信息
 */
export function getUserInfo(): Promise<HttpResponse.Callback<User.Info>> {
  return new Promise((resolve, reject) => {
    axios
      .get<any, HttpResponse.Callback<User.Info>>(api.userInfo)
      .then(res => {
        const { code, message } = res;
        if (code) {
          reject(new Error(message));
        } else {
          resolve(res);
        }
      })
      .catch(reject);
  });
}
