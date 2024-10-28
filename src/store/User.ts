import { makeAutoObservable } from 'mobx';
import { getUserInfo } from '@/api/user';

class UserStore {
  info: User.Info = {
    sessionToken: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 重置用户信息
   */
  resetUserInfo() {
    this.info = {
      sessionToken: '',
    };
  }

  *initUser(): Generator<Promise<any>, any, any> {
    try {
      const res = yield getUserInfo();
      const { code, data } = res;
      if (code) return {};
      this.info = data;
      return data;
    } catch (error) {
      console.log(error);
      return {};
    }
  }
}

const userStore = new UserStore();

export default userStore;
