import { DemoStore } from '@/store/Demo';

/**
 * 定义User组件所使用Mobx的store是哪一个“类”
 */
export interface DemoStoreProps {
  demoState: DemoStore;
}
