import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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

const breakpoints = {
  320: {
    slidesPerView: 'auto',
    spaceBetween: 10,
  },
  720: {
    slidesPerView: 'auto',
    spaceBetween: 20,
  },
};

const clickToSlide = (evt, swiperSlide, swiper, navigate, id) => {
  evt.preventDefault();
  if (swiperSlide.isActive) navigate(linkRoute.FILM + id);
  if (swiperSlide.isNext) {
    swiper.slideNext();
  } else {
    swiper.slidePrev();
  }
};

function Slide({ slide }) {
  const swiperSlide = useSwiperSlide();
  const swiper = useSwiper();
  const navigate = useNavigate();

  return (
    <Link
      className={styles.link}
      to={linkRoute.FILM + slide.id}
      onClick={(evt) =>
        clickToSlide(evt, swiperSlide, swiper, navigate, slide.id)
      }
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
  const { data = [], error, isLoading, isError } = useGetPremiereFilmsQuery();

  return (
    <section className="page-block page-block--promo">
      {isLoading && <Spinner width={75} height={75} />}
      {isError && <span>Errror: {error}</span>}
      {data.docs && (
        <Swiper
          className={styles.slider}
          centeredSlides
          loop
          speed={700}
          breakpoints={breakpoints}
          navigation={sliderBtnsNavigation}
          modules={[Navigation]}
        >
          {data.docs.map((slide) => (
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

Slide.propTypes = {
  slide: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    ageRating: PropTypes.number,
    movieLength: PropTypes.number.isRequired,
    backdrop: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    rating: PropTypes.shape({
      imdb: PropTypes.number.isRequired,
    }),
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};

export default PromoSlider;
