import React, { memo } from 'react';

import clsx from 'clsx';
import styles from './filmTabs.module.scss';

interface Props {
  description?: string;
  ratingKp: number;
  ratingImdb: number;
}

const FilmTabs = memo(({ description, ratingKp, ratingImdb }: Props) => {
  const [activeTab, setActiveTab] = React.useState(1);
  const [openDesc, setOpenDesc] = React.useState(false);

  return (
    <section className={styles.tabs}>
      <div className="container">
        <ul className={styles.tabsList}>
          <li>
            <button
              type="button"
              className={clsx(styles.tab, activeTab === 1 && styles.tabActive)}
              onClick={() => setActiveTab(1)}
            >
              Описание
            </button>
          </li>
          <li>
            <button
              type="button"
              className={clsx(styles.tab, activeTab === 2 && styles.tabActive)}
              onClick={() => setActiveTab(2)}
            >
              Cборы
            </button>
          </li>
        </ul>
        <div
          className={clsx(
            styles.tabContent,
            styles.tabContentDesc,
            activeTab !== 1 && styles.tabContentHidden,
          )}
        >
          <div className={styles.tabContentBlock}>
            <p className={clsx(styles.tabText, openDesc && styles.tabTextShow)}>
              {description || 'Описание отсутствует'}
            </p>
            {description && (
              <button
                className={styles.tabBtn}
                onClick={() => setOpenDesc(!openDesc)}
                type="button"
              >
                {openDesc ? 'Свернуть описание' : 'Подробное описание'}
              </button>
            )}
          </div>
          <div className={styles.rating}>
            <h2 className={styles.ratingTitle}>Рейтинг:</h2>
            <div className={styles.ratingBlock}>
              <p className={styles.ratingText}>{ratingKp.toFixed(1)}</p>
              <p className={styles.ratingDesc}>kinopoisk</p>
            </div>
            <div className={styles.ratingBlock}>
              <p className={styles.ratingText}>{ratingImdb.toFixed(1)}</p>
              <p className={styles.ratingDesc}>imdb</p>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            styles.tabContent,
            activeTab !== 2 && styles.tabContentHidden,
          )}
        />
      </div>
    </section>
  );
});

export default FilmTabs;
