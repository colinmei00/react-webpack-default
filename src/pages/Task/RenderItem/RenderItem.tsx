import { useInView } from 'react-intersection-observer';
import { Image } from 'antd-mobile';
import { RenderItemProps } from './interface';
import * as styles from './RenderItem.module.less';
import ImagePlaceholder from '@/components/ImagePlaceholder';

export default function RenderItem(props: RenderItemProps) {
  const { item } = props;

  /** 元素是否进入视口 */
  const { ref, inView } = useInView({
    /* 每个元素只触发观察者一次 */
    triggerOnce: true,
  });

  return (
    <section className={styles.item} ref={ref}>
      {inView ? (
        <Image
          src={item.imageUrl}
          className={styles['item-cover']}
          placeholder={<ImagePlaceholder logoSize={36} />}
        />
      ) : null}
    </section>
  );
}
