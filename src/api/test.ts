import axios from '@/api/init';
import { UrlString } from '@/types/api';

const api: UrlString = {
  bannerList: '/api/notices',
};

/**
 * 测试接口，获取首页banner列表
 */
export function getBannerList(params: { category: string }): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get<any, HttpResponse.Callback<any>>(api.bannerList, {
        params,
      })
      .then(res => {
        const { code, data, message } = res;
        if (code === 0) {
          resolve(data);
        }
        reject(new Error(message));
      })
      .catch(reject);
  });
}
