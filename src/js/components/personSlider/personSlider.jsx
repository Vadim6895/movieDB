import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

import styles from './personSlider.module.scss';
import SliderBtns, { sliderBtnsNavigation } from '../sliderBtns/sliderBtns';

const breakpoints = {
  320: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  420: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
  620: {
    slidesPerView: 5,
    spaceBetween: 15,
  },
  768: {
    slidesPerView: 6,
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 7,
    spaceBetween: 15,
  },
  1280: {
    slidesPerView: 9,
    spaceBetween: 30,
  },
};

function PersonSlider({ persons }) {
  return (
    <section className="page-block">
      <div className="container">
        <h2 className={styles.title}>Актеры</h2>
        <Swiper
          className={styles.slider}
          speed={700}
          modules={[Navigation]}
          breakpoints={breakpoints}
          navigation={sliderBtnsNavigation}
        >
          {persons.map((item) => (
            <SwiperSlide className={styles.slide} key={item.id}>
              <Link to="#">
                <div className={styles.personWrapper}>
                  <span className={styles.shortName}>НА</span>
                  <img
                    className={styles.person}
                    src={item.photo}
                    alt="Фото актера"
                  />
                </div>
                <p className={styles.personName}>{item.name || item.enName}</p>
              </Link>
            </SwiperSlide>
          ))}
          <SliderBtns style={styles.sliderPageBtns} />
        </Swiper>
      </div>
    </section>
  );
}

PersonSlider.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      photo: PropTypes.string.isRequired,
      name: PropTypes.string,
      enName: PropTypes.string,
    }),
  ).isRequired,
};

export default PersonSlider;
