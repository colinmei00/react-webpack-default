import { fetchMockApi } from '@/mock/task';
import * as styles from './Task.module.less';
import { useState } from 'react';
import Waterfall from '@/components/Waterfall';
import {
  TopicListDetail,
  WaterfallItemProps,
} from '@/components/Waterfall/interface';
import InfiniteScroll from '@/components/InfiniteScroll';
import RenderItem from './RenderItem';

export default function Task() {
  const [list, setList] = useState<TopicListDetail[]>([]);

  /** 列表是否加载完毕，防止瀑布流列表计算首次加载触发两次请求 */
  const [listLoaded, setListLoaded] = useState(true);

  /** 上滑加载更多 */
  const [hasMore, setHasMore] = useState(true);

  const getList = async () => {
    try {
      /** 防止上滑动加载请求2条数据 */
      setListLoaded(false);
      const res = await fetchMockApi();
      console.log(res);
      setList(prev => [...prev, ...res]);
      setHasMore(res.length > 0);
    } catch (e: any) {
      console.log(e?.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <Waterfall
          list={list}
          itemParams={{
            sidesPadding: 32,
            columnGap: 15,
            rowGap: 15,
          }}
          setListLoaded={setListLoaded}
          renderItem={(item: WaterfallItemProps) => <RenderItem item={item} />}
        />
      </div>
      <InfiniteScroll
        isEmpty={list.length === 0}
        hasMore={hasMore}
        listLoaded={listLoaded}
        loadMore={getList}
      />
    </div>
  );
}
