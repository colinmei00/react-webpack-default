import { InfiniteScrollProps } from 'antd-mobile';

export interface ScrollProps extends InfiniteScrollProps {
  isEmpty?: boolean;
  /** 列表是否加载完毕，防止瀑布流列表计算首次加载触发两次请求 */
  listLoaded?: boolean;
}
