import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide, useSwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

import styles from './promoSlider.module.scss';
import SliderBtns, { sliderBtnsNavigation } from '../sliderBtns/sliderBtns';
import { getRatingColor, getMovieTime } from '../../utils';
import { useGetPremiereFilmsQuery } from '../../reducer/filmsApi';
import Spinner from '../spinner/spinner';
import { linkRoute } from '../../const';

import { PremiereFilm } from '../../types';

function Slide({ slide }: { slide: PremiereFilm }) {
  const swiperSlide = useSwiperSlide();
  const swiper = useSwiper();
  const navigate = useNavigate();

  return (
    <Link
      className={styles.link}
      to={linkRoute.FILM + slide.id}
      onClick={(evt) => {
        evt.preventDefault();
        if (swiperSlide.isActive) navigate(linkRoute.FILM + slide.id);
        if (swiperSlide.isNext) {
          swiper.slideNext();
        } else {
          swiper.slidePrev();
        }
      }}
    >
      <div className={styles.wrapper} />
      <img className={styles.img} src={slide.backdrop.url} alt="poster" />
      <div className={styles.content}>
        <h2 className={styles.title}>{slide.name}</h2>
        <div className={styles.subcontent}>
          <div
            className={clsx(styles.rating, getRatingColor(slide.rating.imdb))}
          >
            {slide.rating.imdb.toFixed(1)}
          </div>
          <span className={styles.desc}>{slide.year}</span>
          <span className={clsx(styles.desc, styles.descGenre)}>
            {slide.genres[0].name}
          </span>
          <span className={styles.desc}>{getMovieTime(slide.movieLength)}</span>
          <span className={styles.desc}>
            {slide.ageRating && `${slide.ageRating}+`}
          </span>
        </div>
      </div>
    </Link>
  );
}

function PromoSlider() {
  const { data, error, isLoading, isError } = useGetPremiereFilmsQuery();

  return (
    <section className="page-block page-block--promo">
      {isLoading && <Spinner width={75} height={75} />}
      {isError && (
        <span>Errror: {'message' in error ? error.message : ''}</span>
      )}
      {data?.docs && (
        <Swiper
          className={styles.slider}
          centeredSlides
          loop
          speed={700}
          breakpoints={{
            320: {
              slidesPerView: 'auto',
              spaceBetween: 10,
            },
            720: {
              slidesPerView: 'auto',
              spaceBetween: 20,
            },
          }}
          navigation={sliderBtnsNavigation}
          modules={[Navigation]}
        >
          {data.docs.map((slide: PremiereFilm) => (
            <SwiperSlide className={styles.slide} key={slide.id}>
              <Slide slide={slide} />
            </SwiperSlide>
          ))}

          <SliderBtns style={styles.sliderPromoBtns} />
        </Swiper>
      )}
    </section>
  );
}

export default PromoSlider;
