import React, { useEffect, useState } from 'react';
import * as styles from './Waterfall.module.less';
import { WaterfallItemProps, WaterfallProps } from './interface';

const Waterfall: React.FC<WaterfallProps> = ({
  list,
  scrollY = 0,
  itemParams = {
    sidesPadding: 32,
    columnGap: 15,
    rowGap: 15,
  },
  renderItem,
  onClick,
  setListScrollY,
  setListLoaded,
}) => {
  const [templateColArr, setTemplateColArr] = useState<WaterfallItemProps[][]>([
    [],
    [],
  ]);

  useEffect(() => {
    if (list.length > 0) {
      computeAndSetList();
    } else {
      setTemplateColArr([[], []]);
    }
  }, [list]);

  /** 瀑布流列表计算完成后，回到上次的滚动位置 */
  useEffect(() => {
    if (scrollY && templateColArr[0].length > 0) {
      window.scrollTo({
        top: scrollY,
      });
      /** 滚动完成后，清空滚动位置 */
      if (setListScrollY) {
        setListScrollY(0);
      }
    }
  }, [scrollY, templateColArr]);

  useEffect(() => {
    /** 瀑布流列表计算完成后设置列表加载状态 */
    if (templateColArr[0].length > 0 || templateColArr[1].length > 0) {
      setListLoaded(true);
    }
  }, [templateColArr]);

  /** 计算宽高信息 */
  const computeAndSetList = async () => {
    const updatedList = await Promise.all(
      list.map(async item => {
        if (!item.width || !item.height) {
          const dimensions = await getImageDimensions(item.imageUrl);
          return { ...item, ...dimensions };
        }
        return item;
      })
    );
    computedList(updatedList as WaterfallItemProps[]);
  };

  /** 获取列表中每个图片宽高 */
  const getImageDimensions = (url: string) =>
    new Promise<{ width: number; height: number }>(resolve => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = url;
    });

  /** 计算左右列表 */
  const computedList = (updatedList: WaterfallItemProps[]) => {
    const left: WaterfallItemProps[] = [];
    const right: WaterfallItemProps[] = [];
    let leftHeight = 0;
    let rightHeight = 0;
    /** 单列宽度应该等于屏幕宽度减去两侧的padding和列之间的gap然后除以2 */
    const viewWidth =
      (window.innerWidth - itemParams.sidesPadding - itemParams.columnGap) / 2;

    updatedList.forEach(item => {
      const { width, height } = item;
      if (!width || !height) {
        console.error('Item width and height must be provided');
        return;
      }

      const ratio = width / height;
      /** 根据图片元素宽高比计算出展示出来的高度 */
      const viewHeight = viewWidth / ratio;
      const newItem = { ...item, viewHeight, viewWidth };

      if (leftHeight <= rightHeight) {
        left.push(newItem);
        leftHeight += viewHeight;
      } else {
        right.push(newItem);
        rightHeight += viewHeight;
      }
    });

    setTemplateColArr([left, right]);
  };

  /** 默认渲染 */
  const defaultRenderItem = (item: WaterfallItemProps, index: number) => (
    <img
      src={item.imageUrl}
      alt={`Item ${index}`}
      className={styles.defaultItem}
    />
  );

  return (
    <div className={styles.container}>
      {templateColArr.map((column, colIndex) => (
        <div
          key={colIndex}
          style={{ width: `calc(50%-${itemParams.columnGap / 2})` }}
        >
          {column.map((item, index) => (
            <div
              key={item.topicId} // 使用唯一键
              className={styles.item}
              style={{
                width: item.viewWidth,
                height: item.viewHeight,
                marginBottom: itemParams.rowGap,
              }}
              onClick={() => onClick?.(item)}
            >
              {renderItem ? renderItem(item) : defaultRenderItem(item, index)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Waterfall;
