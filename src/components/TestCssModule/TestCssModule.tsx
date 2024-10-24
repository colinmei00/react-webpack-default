import React from 'react';
import * as styles from './TestCssModule.module.less';

function TestCssModule() {
  return (
    <div>
      <div className="ssss">123213</div>
      <div className={styles.title} id={styles.new}>
        我是title
      </div>
    </div>
  );
}

export default TestCssModule;
