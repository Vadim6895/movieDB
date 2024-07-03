import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

import { useGetSliderFilmsQuery } from '../../reducer/filmsApi';

import styles from './cardsSlider.module.scss';
import SliderBtns, { sliderBtnsNavigation } from '../sliderBtns/sliderBtns';
import Spinner from '../spinner/spinner';
import sprite from '../../../img/sprite.svg';
import { spriteNames, linkRoute, appRoute, selectTypes } from '../../const';
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

function CardsSlider({ genre }: { genre: { id: string; name: string } }) {
  const {
    data = {},
    error,
    isLoading,
    isError,
  } = useGetSliderFilmsQuery({
    'genres.name': genre.id,
    limit: 20,
    type: 'movie',
  });

  return (
    <section className="page-block">
      <div className="container">
        <Link
          to={`${appRoute.FILMS}?${selectTypes.genres}=${genre.id}`}
          className={styles.link}
        >
          <h2 className={styles.title}>{genre.name}</h2>
          <span className={styles.icon}>
            <svg>
              <use xlinkHref={`${sprite}#${spriteNames.common.sliderArrow}`} />
            </svg>
          </span>
        </Link>

        {isLoading && <Spinner width={75} height={75} />}
        {isError && (
          <span>Error: {'message' in error ? error.message : ''}</span>
        )}

        {data.docs && (
          <Swiper
            className={styles.slider}
            speed={700}
            modules={[Navigation]}
            breakpoints={breakpoints}
            navigation={sliderBtnsNavigation}
          >
            {data.docs.map((item: Film) => (
              <SwiperSlide className={styles.slide} key={item.id}>
                <Link to={`${linkRoute.FILM}${item.id}`}>
                  <div className={styles.wrapper}>
                    <img
                      className={styles.poster}
                      src={item.poster?.previewUrl}
                      alt=""
                    />
                    <div className={styles.content}>
                      <div
                        className={clsx(
                          styles.rating,
                          getRatingColor(item.rating?.kp),
                        )}
                      >
                        {Boolean(item.rating?.kp) &&
                          item.rating?.kp?.toFixed(1)}
                      </div>
                      <div className={styles.btns}>
                        {/* <PageBtn iconName="favorite" /> */}
                        {/* <PageBtn
                          iconName="details"
                          setPopupCoords={(evt) => btnHandleClick(evt, item.id)}
                        /> */}
                      </div>
                      <p className={styles.name}>{item.name}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
            <SwiperSlide className={styles.slide}>
              <Link to={`${appRoute.FILMS}?genres=${genre.id}`}>
                <div className={styles.wrapper}>
                  <div className={styles.showAllWrapper}>
                    <svg className={styles.showAllIcon}>
                      <use
                        xlinkHref={`${sprite}#${spriteNames.common.sliderArrow}`}
                      />
                    </svg>
                    <p className={styles.showAllText}>Показать все</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SliderBtns style={styles.sliderPageBtns} />
          </Swiper>
        )}
      </div>
    </section>
  );
}

export default CardsSlider;
