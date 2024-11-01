import { DotLoading, InfiniteScroll as InfiniteScrollAntd } from 'antd-mobile';
import * as styles from './InfiniteScroll.module.less';
import { ScrollProps } from './interface';

function InfiniteScroll(props: ScrollProps) {
  const { hasMore, loadMore, isEmpty = false, listLoaded = true } = props;
  return (
    <InfiniteScrollAntd loadMore={loadMore} hasMore={hasMore && listLoaded}>
      {hasMore ? (
        <span className={styles.infiniteScrollContent}>
          加载更多中
          <DotLoading />
        </span>
      ) : (
        !isEmpty && (
          <span className={styles.infiniteScrollContent}>没有更多了</span>
        )
      )}
    </InfiniteScrollAntd>
  );
}

export default InfiniteScroll;
