import React from 'react';
import clsx from 'clsx';

import styles from './playerPopup.module.scss';
import BasePopup from '../basePopup/basePopup';
import Spinner from '../spinner/spinner';

import { playerObj } from '../../types';

interface Props {
  setVisible: (v: boolean) => void;
  data: playerObj[];
}

function PlayerPopup({ setVisible, data }: Props) {
  const [activePlayer, setActivePlayer] = React.useState(data[0]);
  const [loading, setLoading] = React.useState(true);
  const frameRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (frameRef?.current) {
      frameRef.current.addEventListener('load', () => {
        setLoading(false);
      });
    }
  }, []);

  const changePlayer = (item: playerObj) => {
    setActivePlayer(item);
    setLoading(true);
  };

  return (
    <BasePopup setVisible={setVisible}>
      <div className={styles.playerTabs}>
        {data.map((item, i) => (
          <button
            className={clsx(
              styles.playerTabBtn,
              item.iframeUrl === activePlayer.iframeUrl &&
                styles.playerTabBtnActive,
            )}
            type="button"
            key={item.iframeUrl}
            onClick={() => changePlayer(item)}
          >
            Плеер №{i + 1} [{item.source}]
          </button>
        ))}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.frameWrapper}>
          {loading && (
            <div className={styles.spinnerWrapper}>
              <Spinner width={75} height={75} />
            </div>
          )}
          <iframe
            ref={frameRef}
            width="100%"
            height="100%"
            title="Player"
            src={activePlayer.iframeUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </BasePopup>
  );
}

export default PlayerPopup;
