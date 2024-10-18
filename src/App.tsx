import React, { lazy, Suspense, useEffect, useState } from "react";
import * as styles from "./index.module.less";
import TestCssModule from "./components/TestCssModule";
import "./app.css";

// prefetch
const PreFetchDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreFetchDemo" */
      /*webpackPrefetch: true*/
      "@/components/PreFetchDemo"
    )
);
// preload
const PreloadDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreloadDemo" */
      /*webpackPreload: true*/
      "@/components/PreloadDemo"
    )
);

function App() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("===", styles);
  }, []);

  const onClick = () => {
    setShow(true);
  };
  return (
    <div>
      <h2 className="ssss">app的ssss</h2>
      <h2 onClick={onClick} className={styles.title}>
        展示
      </h2>
      <TestCssModule />
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
export default App;
