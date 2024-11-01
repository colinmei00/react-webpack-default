import * as styles from './ImagePlaceholder.module.less';
import { ImagePlaceholderProps } from './interface';
import placeholdImage from '@/assets/imgs/1kb.png';

export default function ImagePlaceholder(props: ImagePlaceholderProps) {
  const { logoSize = 32, backgroundColor = 'rgba(11, 11, 13, 0.03)' } = props;

  return (
    <div className={styles.container} style={{ backgroundColor }}>
      <img
        src={placeholdImage}
        style={{
          width: logoSize,
          height: logoSize,
        }}
        alt=""
      />
    </div>
  );
}
