/** 分类下的模板列表 */
export interface TopicListDetail {
  /**  模板ID */
  topicId: string;
  /**  封面高 */
  height: number;
  /**  封面宽 */
  width: number;
  /** 图片 */
  imageUrl: string;
}

export interface WaterfallItemProps extends TopicListDetail {
  /** Id */
  id: number;
  /** 图片 */
  imageUrl: string;
  /** 可视宽度 */
  viewWidth?: number;
  /** 可视高度 */
  viewHeight?: number;
}

export interface ItemSideParams {
  /** 整个列表的左右边距总和 */
  sidesPadding: number;
  /** 两列之间的间距 */
  columnGap: number;
  /** item上下的间距 */
  rowGap: number;
}

export interface WaterfallProps {
  /** 瀑布流列表 */
  list: TopicListDetail[];
  /** 页面垂直滚动的距离 */
  scrollY?: number;
  /** 模块的边距信息 */
  itemParams?: ItemSideParams;
  /** 设置列表滚动距离 */
  setListScrollY?: (val: number) => void;
  /** 渲染图层 */
  renderItem?: (item: WaterfallItemProps, index?: number) => React.ReactNode;
  /** Item点击 */
  onClick?: (item: WaterfallItemProps) => void;
  /** 列表加载完成 */
  setListLoaded: (val: boolean) => void;
}
