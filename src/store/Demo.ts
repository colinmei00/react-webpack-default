import { makeAutoObservable } from 'mobx';

/**
 * 这里导出DemoStore是防止组件被observer包裹后使用store会有个ts报错
 */
export class DemoStore {
  /**
   * 搭配observer使用，可以实现useState的效果，切换路由不会重置！！！
   */
  age = 18;

  constructor() {
    makeAutoObservable(this);
  }

  setSecondsPassed(val: number) {
    this.age = val;
  }

  increase() {
    this.age += 1;
  }
}

const demoStore = new DemoStore();

export default demoStore;
