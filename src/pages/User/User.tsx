import * as styles from './User.module.less';
import TheButton from '@/components/TheButton';
import { DemoStoreProps } from './interface';
/**
 * observe可以让组件使用的store自动更新如(demoState.age)，类似于useState；
 * 当你改变demoState.age的时候，不需要重新获取age，组件也会重新渲染；
 * 与useState不同的是，你改变了age，马上打印会发现已经是最新的了；
 */
import { observer } from 'mobx-react-lite';

const User = ({ demoState }: DemoStoreProps) => {
  const handleClickBtn = () => {
    demoState.setSecondsPassed(33);
    console.log('点击了', demoState.age);
  };

  return (
    <div className={styles.container}>
      <p className={styles.age}>
        我的年龄是：
        <span>{demoState.age}</span>
      </p>
      <TheButton onClick={handleClickBtn}>修改年龄</TheButton>
    </div>
  );
};

export default observer(User);
