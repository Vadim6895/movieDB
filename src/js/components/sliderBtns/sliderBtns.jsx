import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './sliderBtns.module.scss';
import sprite from '../../../img/sprite.svg';
import { spriteNames } from '../../const';

const sliderBtnsNavigation = {
  nextEl: `.${styles.btnNext}`,
  prevEl: `.${styles.btnPrev}`,
};

function SliderBtns({ style = '' }) {
  return (
    <>
      <button
        className={clsx(style, styles.btnPrev)}
        type="button"
        aria-label="prev"
      >
        <svg>
          <use xlinkHref={`${sprite}#${spriteNames.common.sliderArrow}`} />
        </svg>
      </button>
      <button
        className={clsx(styles.btnNext, style)}
        type="button"
        aria-label="next"
      >
        <svg>
          <use xlinkHref={`${sprite}#${spriteNames.common.sliderArrow}`} />
        </svg>
      </button>
    </>
  );
}

SliderBtns.propTypes = {
  style: PropTypes.string.isRequired,
};

export { sliderBtnsNavigation };
export default SliderBtns;
