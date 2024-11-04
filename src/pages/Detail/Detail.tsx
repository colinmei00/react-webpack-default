import { useLoaderData } from 'react-router-dom';
import * as styles from './Detail.module.less';
import { useEffect } from 'react';
import { DetailLoaderData } from './interface';

function Detail() {
  const { list } = useLoaderData() as DetailLoaderData;

  useEffect(() => {
    console.log('detail页面打印', list);
  }, []);

  return <div className={styles.title}>Detail</div>;
}

export default Detail;
