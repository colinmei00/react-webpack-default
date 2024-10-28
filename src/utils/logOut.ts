import { clearLocalStorage } from '@/helper/login';
import userStore from '@/store/User';

export default function logOut() {
  clearLocalStorage();
  userStore.resetUserInfo();
  window.location.href = '/login';
}
