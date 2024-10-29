import React from 'react';
import clsx from 'clsx';

import styles from './sliderBtns.module.scss';
import Icon from '../icon/icon';
import { spriteNames } from '../../const';

const sliderBtnsNavigation = {
  nextEl: `.${styles.btnNext}`,
  prevEl: `.${styles.btnPrev}`,
};

function SliderBtns({ style = '' }: { style: string }) {
  return (
    <>
      <button
        className={clsx(style, styles.btnPrev)}
        type="button"
        aria-label="prev"
      >
        <Icon
          width={30}
          height={30}
          iconName={spriteNames.common.sliderArrow}
        />
      </button>
      <button
        className={clsx(styles.btnNext, style)}
        type="button"
        aria-label="next"
      >
        <Icon
          width={30}
          height={30}
          iconName={spriteNames.common.sliderArrow}
        />
      </button>
    </>
  );
}

export { sliderBtnsNavigation };
export default SliderBtns;
