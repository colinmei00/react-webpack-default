import { fetchMockApi } from '@/mock/task';
import * as styles from './Task.module.less';
import { useEffect, useState } from 'react';
import Waterfall from '@/components/Waterfall';
import {
  TopicListDetail,
  WaterfallItemProps,
} from '@/components/Waterfall/interface';
import InfiniteScroll from '@/components/InfiniteScroll';
import RenderItem from './RenderItem';
import { useLocation } from 'react-router-dom';
import ListLoading from './ListLoading';

export default function Task() {
  const [list, setList] = useState<TopicListDetail[]>([]);

  const { name } = useLocation().state;

  /** 列表是否加载完毕，防止瀑布流列表计算首次加载触发两次请求 */
  const [listLoaded, setListLoaded] = useState(true);

  /** 上滑加载更多 */
  const [hasMore, setHasMore] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    console.log(name, '这是路由state参数，刷新页面也不会消失');
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {loading ? (
          <ListLoading />
        ) : (
          <Waterfall
            list={list}
            itemParams={{
              sidesPadding: 32,
              columnGap: 15,
              rowGap: 15,
            }}
            setListLoaded={setListLoaded}
            renderItem={(item: WaterfallItemProps) => (
              <RenderItem item={item} />
            )}
          />
        )}
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
