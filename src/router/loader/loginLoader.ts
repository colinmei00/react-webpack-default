import { redirect } from 'react-router-dom';
import { flowResult } from 'mobx';
import { getToken, clearLocalStorage } from '@/helper/login';
import userStore from '@/store/User';

/**
 * @name loginLoader
 * @returns redirect('/login') | null
 * @description 是否登陆，未登陆则跳转登陆
 */
async function loginLoader() {
  const token = getToken();

  /** 检验token是否存在 */
  if (!token) return redirect('/login');
  /** 校验token是否过期 */
  const user = await flowResult(userStore.initUser());
  if (!user?.id) {
    clearLocalStorage();
    return redirect('/login');
  }

  return null;
}

export default loginLoader;
