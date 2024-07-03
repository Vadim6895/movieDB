import React, { RefObject } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './filmsContainer.module.scss';
import { getRatingColor } from '../../utils';
import { linkRoute } from '../../const';

interface Film {
  id: number;
  poster?: {
    previewUrl: string;
  };
  rating?: {
    kp: number;
  };
  name: string;
}

interface Props {
  films: {
    docs: Film[];
  };
  filmsref: RefObject<HTMLDivElement>;
  loading: boolean;
}

function filmsContainer({ films, filmsref, loading }: Props) {
  return (
    <div
      className={clsx(styles.filmsWrapper, loading && styles.filmsWrapperLoad)}
      ref={filmsref}
    >
      {films.docs.map((item) => (
        <Link
          className={styles.link}
          to={linkRoute.FILM + item.id}
          key={item.id}
        >
          <img
            className={styles.poster}
            src={item.poster?.previewUrl}
            alt="preview-poster"
          />
          <div className={styles.content}>
            <div
              className={clsx(styles.rating, getRatingColor(item.rating?.kp))}
            >
              {Boolean(item.rating?.kp) && item.rating?.kp?.toFixed(1)}
            </div>
            <div className={styles.btns}>
              {/* <PageBtn iconName="favorite" /> */}
            </div>
            <p className={styles.name}>{item.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default filmsContainer;
