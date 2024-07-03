import React, { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './filmBtn.module.scss';

interface Props {
  // eslint-disable-next-line react/require-default-props
  trailer?: boolean;
  // eslint-disable-next-line react/require-default-props
  handler?: (v: boolean) => void;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
  children: ReactNode;
}

function FilmBtn({ trailer, handler, disabled, children }: Props) {
  let timerId: NodeJS.Timeout;
  let angle = 0;

  function onHover(evt: React.MouseEvent) {
    const btn = evt.currentTarget as HTMLButtonElement;
    timerId = setInterval(() => {
      btn.style.setProperty('--angle-grad', `${angle}deg`);
      if (angle >= 360) angle = 0;
      angle += 2;
    }, 10);
  }

  function onLeave() {
    clearInterval(timerId);
  }

  return (
    <button
      disabled={disabled}
      className={clsx(styles.movieBtn, trailer && styles.movieBtnTrailer)}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      type="button"
      onClick={() => handler && handler(true)}
    >
      <div className={styles.movieBtnContent}>{children}</div>
    </button>
  );
}

export default FilmBtn;
