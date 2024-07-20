import React from 'react';

import styles from './basePopup.module.scss';
import sprite from '../../../img/sprite.svg';
import { spriteNames } from '../../const';
import useModalEffect from '../../hooks/useModalEffect';

interface Props {
  children: React.ReactNode;
  setVisible: (v: boolean) => void;
}

/* eslint-disable */
function BasePopup({ children, setVisible }: Props) {
  useModalEffect(setVisible);

  return (
    <div className={styles.overlay} onClick={() => setVisible(false)}>
      <div className={styles.popup} onClick={(evt) => evt.stopPropagation()}>
        <button
          className={styles.closeBtn}
          type="button"
          aria-label="close"
          onClick={() => setVisible(false)}
        >
          <svg width={30} height={30}>
            <use xlinkHref={`${sprite}#${spriteNames.common.close}`} />
          </svg>
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default BasePopup;
