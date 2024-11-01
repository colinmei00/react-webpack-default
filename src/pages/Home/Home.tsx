import { useEffect, useState } from 'react';
import { getBannerList } from '@/api/test';
import * as styles from './Home.module.less';
import TheButton from '@/components/TheButton';
import classnames from 'classnames';
import { Toast } from 'antd-mobile';
/**
 * 第一种引入store方式，可以通过对象解构出里面所有的store
 */
import { useStore } from '@/store';
import Content from '@/components/Content';

export default function Home() {
  const { test } = useStore();
  const [text, setText] = useState(test.store.text);

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
    setText('user');
    test.setTestText('user');
    Toast.show('更改store的值');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{text}</div>
      <h2>{`当前BASE_ENV的值为：${process.env.BASE_ENV}`}</h2>
      <TheButton
        onClick={handleClickBtn}
        className={classnames(styles.submit, {
          [styles.disabled]: true,
        })}
      >
        确定
      </TheButton>
      <Content />
    </div>
  );
}
