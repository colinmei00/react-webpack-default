import React, { useEffect } from 'react';
import { getBannerList } from '@/api/test';
import * as styles from './Home.module.less';
import TheButton from '@/components/TheButton';
import classnames from 'classnames';
import { Toast } from 'antd-mobile';

export default function Home() {
  useEffect(() => {
    getBanner();
  }, []);

  /** 获取首页banner列表 */
  const getBanner = async () => {
    try {
      const res = await getBannerList({ category: 'topBanner' });
      console.log('banner:', res);
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleClickBtn = () => {
    Toast.show('click');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Home</div>
      <TheButton
        onClick={handleClickBtn}
        className={classnames(styles.submit, {
          [styles.disabled]: true,
        })}
      >
        确定
      </TheButton>
    </div>
  );
}
