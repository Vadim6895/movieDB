import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './ytpopup.module.scss';
import sprite from '../../../img/sprite.svg';
import { spriteNames } from '../../const';
import { youtubeParser } from '../../utils';
import useModalEffect from '../../hooks/useModalEffect';

/* eslint-disable */
function YtPopup({ data, setVisible }) {
  useModalEffect(setVisible);
  const [activeItem, setActiveITem] = React.useState({ index: 0 });

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
        <div className={styles.content}>
          <div className={styles.trailersList}>
            {data.map((item, i) => (
              <div
                className={
                  activeItem.index === i
                    ? clsx(styles.btn, styles.btnActive)
                    : styles.btn
                }
                key={item.name + i}
                onClick={() => setActiveITem({ index: i, url: item.url })}
              >
                <div className={styles.numberBtn}>{i + 1}</div>
                <img
                  width={120}
                  height={90}
                  className={styles.previewImg}
                  src={`//img.youtube.com/vi/${youtubeParser(item.url)}/hqdefault.jpg`}
                  alt="Превью трейлера"
                />
                <div className={styles.info}>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.type}>{item.type}</p>
                  <p className={styles.type}>youtube</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.wrapper}>
            <div className={styles.frameWrapper}>
              <iframe
                width="100%"
                height="100%"
                src={activeItem.url ? activeItem.url : data[0].url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

YtPopup.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      site: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  ),
  setVisible: PropTypes.func.isRequired,
};

export default YtPopup;
