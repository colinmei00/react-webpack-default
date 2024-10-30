import * as styles from './Login.module.less';
import { userLogin } from '@/api/login';

function Login() {
  async function handleUserLogin() {
    try {
      const res = await userLogin({
        phone: '13800138000',
      });
      console.log('res', res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.title} onClick={handleUserLogin}>
      login
    </div>
  );
}

export default Login;
