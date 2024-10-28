import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SafeArea, TabBar } from 'antd-mobile';
import classnames from 'classnames';
import * as styles from './TabBar.module.less';
import homeIcon from '@/assets/imgs/home-not-active.png';
import homeIconActive from '@/assets/imgs/home-active.png';
import userIcon from '@/assets/imgs/user-not-active.png';
import userIconActive from '@/assets/imgs/user-active.png';
import detailIcon from '@/assets/imgs/detail-not-active.png';
import detailIconActive from '@/assets/imgs/detail-active.png';

function CustomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value);
  };

  const tabs = [
    {
      key: '/',
      icon: (active: boolean) => (
        <img
          src={active ? homeIconActive : homeIcon}
          alt="首页"
          className={styles.icon}
        />
      ),
      title: (active: boolean) => (
        <div className={classnames(styles.title, { [styles.active]: active })}>
          首页
        </div>
      ),
    },
    {
      key: '/detail',
      icon: (active: boolean) => (
        <img
          alt="详情"
          src={active ? detailIconActive : detailIcon}
          className={styles.icon}
        />
      ),
      title: (active: boolean) => (
        <div className={classnames(styles.title, { [styles.active]: active })}>
          变现任务
        </div>
      ),
    },
    {
      key: '/user',
      icon: (active: boolean) => (
        <img
          alt="我的"
          src={active ? userIconActive : userIcon}
          className={styles.icon}
        />
      ),
      title: (active: boolean) => (
        <div className={classnames(styles.title, { [styles.active]: active })}>
          我的
        </div>
      ),
    },
  ];

  return (
    <div className={styles.footer}>
      <div className={styles['tabbar-wrapper']}>
        <TabBar
          className={styles.tabbar}
          activeKey={pathname}
          onChange={value => setRouteActive(value)}
        >
          {tabs.map(item => (
            <TabBar.Item key={item.key} title={item.title} icon={item.icon} />
          ))}
        </TabBar>
      </div>
      <SafeArea position="bottom" />
    </div>
  );
}

export default CustomTabBar;
