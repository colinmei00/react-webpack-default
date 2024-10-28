import classnames from 'classnames';
import React, { useState } from 'react';
import { TheButtonProps } from './interface';
import * as styles from './TheButton.module.less';

function TheButton(props: TheButtonProps) {
  const { children, className, onClick } = props;
  const [active, setActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setActive(true);
    onClick?.(e);
    setTimeout(() => {
      setActive(false);
    }, 300);
  };

  return (
    <div
      className={classnames(styles['btn-primary'], className, {
        [styles.active]: active,
      })}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default TheButton;
