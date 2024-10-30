import { Outlet } from 'react-router-dom';
import TabBar from './TabBar';
import * as styles from './index.module.less';

function Layout() {
  return (
    <div className={styles.layout}>
      <Outlet />
      <TabBar />
    </div>
  );
}

export default Layout;
