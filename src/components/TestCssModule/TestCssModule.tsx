import * as styles from './TestCssModule.module.less';

function TestCssModule() {
  return (
    <div>
      <div className="ssss">123213</div>
      <div className={styles.title} id={styles.new}>
        <div className={styles.aaa}>
          <span>我是title</span>
        </div>
      </div>
    </div>
  );
}

export default TestCssModule;
