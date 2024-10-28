import React, { lazy, Suspense, useEffect, useState } from 'react';
import * as styles from './Content.module.less';
import TestCssModule from '@/components/TestCssModule';
import TestPxtovw from '@/components/TestPxtovw';
import '@/assets/style/index.less';
import { Button } from 'antd-mobile';

// prefetch
const PreFetchDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreFetchDemo" */
      /*webpackPrefetch: true*/
      '@/components/PreFetchDemo'
    )
);
// preload
const PreloadDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreloadDemo" */
      /*webpackPreload: true*/
      '@/components/PreloadDemo'
    )
);

function Content() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log('====', styles);
  }, []);

  const onClick = () => {
    setShow(true);
  };
  return (
    <div>
      <h2 onClick={onClick} className={styles.title}>
        展示
      </h2>
      <Button color="success">按钮</Button>
      <TestCssModule />
      <TestPxtovw />
      {/* show为true时加载组件 */}
      {show && (
        <>
          <Suspense fallback={null}>
            <PreloadDemo />
          </Suspense>
          <Suspense fallback={null}>
            <PreFetchDemo />
          </Suspense>
        </>
      )}
    </div>
  );
}
export default Content;
