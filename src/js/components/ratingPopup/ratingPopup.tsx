import React from 'react';
import clsx from 'clsx';

import styles from './ratingPopup.module.scss';
import Icon from '../icon/icon';
import { spriteNames } from '../../const';
import useModalEffect from '../../hooks/useModalEffect';

function RatingPopup({ setVisible }: { setVisible: (v: boolean) => void }) {
  const [activeItem, setActiveItem] = React.useState(-1);
  const [hoverItem, setHoverItem] = React.useState(7);

  const checkActiveItem = (item: number) => {
    if (!hoverItem && item <= activeItem) return styles.ratingItemActive;
    if (item <= hoverItem) return styles.ratingItemActive;
    return false;
  };

  const onMouseLeave = () => {
    if (activeItem < 0) {
      setHoverItem(7);
    } else {
      setHoverItem(activeItem);
    }
    return false;
  };

  useModalEffect(setVisible);
  /* eslint-disable */
  return (
    <div className={styles.overlay} onClick={() => setVisible(false)}>
      <div className={styles.popup} onClick={(evt) => evt.stopPropagation()}>
        <button
          className={styles.closeBtn}
          type="button"
          aria-label="close"
          onClick={() => setVisible(false)}
        >
          <Icon width={30} height={30} iconName={spriteNames.common.close} />
        </button>

        <h3 className={styles.title}>Поставьте оценку</h3>
        <div
          className={styles.ratingWrapper}
          onMouseLeave={() => onMouseLeave()}
        >
          {[...new Array(10)]
            .map((_, i) => i + 1)
            .map((item) => (
              <div
                key={item}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoverItem(item)}
                onClick={() => setActiveItem(item)}
                onKeyDown={() => setActiveItem(item)}
              >
                <label
                  className={clsx(styles.ratingItem, checkActiveItem(item))}
                  htmlFor={String(item)}
                >
                  <span className={styles.ratingText}>{item}</span>
                  <input
                    className="hidden"
                    type="radio"
                    value={item}
                    id={String(item)}
                  />
                </label>
              </div>
            ))}
        </div>
        <button
          className={styles.ratingBtn}
          type="button"
          onClick={() => setVisible(false)}
        >
          Оценить
        </button>
      </div>
    </div>
  );
}

export default RatingPopup;
