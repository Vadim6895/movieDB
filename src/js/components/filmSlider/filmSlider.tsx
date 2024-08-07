import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

import styles from './filmSlider.module.scss';
import SliderBtns, { sliderBtnsNavigation } from '../sliderBtns/sliderBtns';
import { linkRoute } from '../../const';
import { getRatingColor } from '../../utils';

import { Film } from '../../types';

const breakpoints = {
  320: {
    slidesPerView: 2.5,
    spaceBetween: 10,
  },
  420: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  620: {
    slidesPerView: 3.5,
    spaceBetween: 15,
  },
  768: {
    slidesPerView: 3.5,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 4.5,
    spaceBetween: 30,
  },
  1280: {
    slidesPerView: 5.5,
    spaceBetween: 30,
  },
};

function Slide({ item }: { item: Film }) {
  const swiper = useSwiper();

  return (
    <Link to={linkRoute.FILM + item.id} onClick={() => swiper.slideTo(0)}>
      <div className={styles.wrapper}>
        <img
          className={styles.poster}
          src={item.poster?.previewUrl}
          alt="Постер"
        />
        <div className={styles.content}>
          <div
            className={
              item.rating
                ? clsx(styles.rating, getRatingColor(item.rating.kp))
                : ''
            }
          >
            {item.rating && item.rating.kp.toFixed(1)}
          </div>
          <p className={styles.name}>{item.name}</p>
        </div>
      </div>
    </Link>
  );
}

function FilmSlider({ title, data }: { title: string; data: Film[] }) {
  return (
    <section className="page-block">
      <div className="container">
        <h2 className={styles.title}>{title}</h2>

        {data.length && (
          <Swiper
            className={styles.slider}
            speed={700}
            modules={[Navigation]}
            breakpoints={breakpoints}
            navigation={sliderBtnsNavigation}
          >
            {data.map((item: Film) => (
              <SwiperSlide className={styles.slide} key={item.id}>
                <Slide item={item} />
              </SwiperSlide>
            ))}
            <SliderBtns style={styles.sliderPageBtns} />
          </Swiper>
        )}
      </div>
    </section>
  );
}

export default FilmSlider;
