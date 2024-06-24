import React from 'react';
import { Link } from 'react-router-dom';

import styles from './notFound.module.scss';
import { appRoute } from '../../const';

function NotFound() {
  return (
    <section className={styles.notFound}>
      <div className="container">
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Страница не найдена</h1>
          <p className={styles.numbers}>404</p>
          <Link className={styles.link} to={appRoute.MAIN}>
            Перейти на главную
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
