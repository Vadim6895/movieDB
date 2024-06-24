import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

import styles from './genreSlider.module.scss';
import SliderBtns, { sliderBtnsNavigation } from '../sliderBtns/sliderBtns';
import { allGenresNames, appRoute } from '../../const';
import genreSprite from '../../../img/genre-sprite.svg';

const breakpoints = {
  320: {
    slidesPerView: 'auto',
    spaceBetween: 10,
  },
  720: {
    slidesPerView: 'auto',
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 'auto',
    spaceBetween: 20,
  },
};

function GenreSlider() {
  const [sliderPos, setSliderPos] = React.useState();

  const changeShadow = (pos) => {
    if (!pos || pos.isBeginning) return '';
    if (!pos.isBeginning && !pos.isEnd) return styles.blockCentered;
    return styles.blockEnd;
  };

  return (
    <section
      className={clsx('page-block', styles.genreBlock, changeShadow(sliderPos))}
    >
      <div className="container">
        <h2 className={styles.title}>Популярные жанры</h2>

        <Swiper
          speed={700}
          modules={[Navigation]}
          breakpoints={breakpoints}
          className={styles.slider}
          navigation={sliderBtnsNavigation}
          onSlideChange={(swiper) => {
            setSliderPos({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd,
            });
          }}
          onSliderMove={(swiper) => {
            setSliderPos({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd,
            });
          }}
        >
          {allGenresNames.slice(1, 12).map((item) => (
            <SwiperSlide className={styles.slide} key={item.id}>
              <Link
                className={styles.link}
                to={`${appRoute.FILMS}?genres.name=${item.id}`}
              >
                <svg className={styles.icon}>
                  <use xlinkHref={`${genreSprite}#${item.id}`} />
                </svg>
                <span>{item.name}</span>
              </Link>
            </SwiperSlide>
          ))}

          <SliderBtns style={styles.genreBtns} />
        </Swiper>
      </div>
    </section>
  );
}

export default GenreSlider;
