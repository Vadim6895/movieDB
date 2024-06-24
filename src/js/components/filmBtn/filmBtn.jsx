import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './filmBtn.module.scss';

function FilmBtn({ trailer, handler, disabled, children }) {
  let timerId = null;
  let angle = 0;

  function onHover(evt) {
    const target = evt.target.closest(`.${styles.movieBtn}`);
    timerId = setInterval(() => {
      target.style.setProperty('--angle-grad', `${angle}deg`);
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
      onClick={() => handler(true)}
    >
      <div className={styles.movieBtnContent}>{children}</div>
    </button>
  );
}

FilmBtn.propTypes = {
  trailer: PropTypes.bool,
  handler: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

FilmBtn.defaultProps = {
  trailer: false,
  disabled: false,
  handler: () => {},
};

export default FilmBtn;
