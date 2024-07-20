import React from 'react';
import clsx from 'clsx';

import styles from './YtPopup.module.scss';
import BasePopup from '../basePopup/basePopup';
import { youtubeParser } from '../../utils';

import { Trailer } from '../../types';

interface Props {
  data: Trailer[];
  setVisible: (v: boolean) => void;
}
/* eslint-disable */
function YtPopup({ setVisible, data }: Props) {
  const [activeItem, setActiveITem] = React.useState({ index: 0, url: '' });

  return (
    <BasePopup setVisible={setVisible}>
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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </BasePopup>
  );
}

export default YtPopup;
