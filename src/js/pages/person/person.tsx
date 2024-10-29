import React from 'react';
import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';

/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useGetPersonQuery } from '../../reducer/filmsApi';
import 'swiper/css';

import styles from './person.module.scss';
import Icon from '../../components/icon/icon';
import { spriteNames, roleTypes, FACTS_COUNT, linkRoute } from '../../const';
import { filmsByProffesion } from '../../types';
import Spinner from '../../components/spinner/spinner';
import { getFilmsByProfession } from '../../utils';

function Person() {
  const { id } = useParams();
  const { data = {}, isLoading, isError, error } = useGetPersonQuery(id);

  const sortedFilms = React.useMemo(
    () => getFilmsByProfession(data.films),
    [data.films],
  );
  const [activeRole, setRole] = React.useState(sortedFilms[0]);
  const [factsShowed, setFactsShowed] = React.useState(FACTS_COUNT);
  const [filmsShowed, setFilmsShowed] = React.useState(FACTS_COUNT);

  React.useEffect(() => {
    setRole(sortedFilms[0]);
  }, [sortedFilms]);

  const setActiveRole = (item: filmsByProffesion) => {
    setRole(item);
    setFilmsShowed(FACTS_COUNT);
  };

  if (isLoading || isError) {
    return (
      <div className="container" style={{ paddingTop: 300 }}>
        {isLoading && <Spinner width={75} height={75} />}
        {isError && <h2>Error: {'message' in error ? error.message : ''}</h2>}
      </div>
    );
  }

  return (
    <>
      <section className={styles.person}>
        <div className={clsx('container', styles.personContainer)}>
          <div className={styles.personWrapper}>
            <img
              className={styles.personPoster}
              src={data.posterUrl}
              alt="person-poster"
              width={300}
              height={300}
            />
            <div className={styles.personInfo}>
              <h2 className={styles.personName}>{data.nameRu}</h2>
              <p className={styles.personNameEn}>{data.nameEn}</p>
              <ul className={styles.personInfoWrapper}>
                <li className={styles.personInfoItem}>
                  <p className={styles.personInfoTitle}>Карьера:</p>
                  <p className={styles.personInfoDesc}>{data.profession}</p>
                </li>
                <li className={styles.personInfoItem}>
                  <p className={styles.personInfoTitle}>Дата рождения:</p>
                  <p className={styles.personInfoDesc}>
                    {new Date(data.birthday).toLocaleString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </li>
                <li className={styles.personInfoItem}>
                  <p className={styles.personInfoTitle}>Возраст:</p>
                  <p className={styles.personInfoDesc}>{data.age}</p>
                </li>
                {Boolean(data.growth) && (
                  <li className={styles.personInfoItem}>
                    <p className={styles.personInfoTitle}>Рост:</p>
                    <p className={styles.personInfoDesc}>{data.growth} м</p>
                  </li>
                )}
                <li className={styles.personInfoItem}>
                  <p className={styles.personInfoTitle}>Место рождения:</p>
                  <p className={styles.personInfoDesc}>{data.birthplace}</p>
                </li>
                <li className={styles.personInfoItem}>
                  <p className={styles.personInfoTitle}>Всего фильмов:</p>
                  <p className={styles.personInfoDesc}>{data.films.length}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.films}>
        <div className={clsx('container', styles.personContainer)}>
          <h2 className={styles.filmsTitle}>
            Фильмография ({data.films.length})
          </h2>
          <Swiper
            className={styles.slider}
            speed={700}
            modules={[Navigation]}
            breakpoints={{
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
            }}
            navigation={{
              nextEl: `.${styles.btnNext}`,
              prevEl: `.${styles.btnPrev}`,
            }}
          >
            {sortedFilms.map((item) => (
              <SwiperSlide className={styles.slide} key={`${item.role}`}>
                <div
                  role="button"
                  tabIndex={0}
                  className={clsx(
                    styles.filmRole,
                    activeRole &&
                      activeRole.role === item.role &&
                      styles.filmRoleActive,
                  )}
                  onClick={() => setActiveRole(item)}
                  onKeyDown={() => setActiveRole(item)}
                >
                  {roleTypes[item.role]} ({item.films.length})
                </div>
              </SwiperSlide>
            ))}
            <button className={styles.btnPrev} type="button" aria-label="prev">
              <Icon
                width={30}
                height={30}
                iconName={spriteNames.common.sliderArrow}
              />
            </button>
            <button className={styles.btnNext} type="button" aria-label="next">
              <Icon
                width={30}
                height={30}
                iconName={spriteNames.common.sliderArrow}
              />
            </button>
          </Swiper>
          <div className={styles.filmsContainer}>
            {activeRole &&
              activeRole.films.slice(0, filmsShowed).map((item) => (
                <div
                  className={styles.film}
                  key={`${item.nameEn}${item.description}`}
                >
                  <div className={styles.filmWrapper}>
                    <div className={styles.filmMainInfo}>
                      <Link to={`${linkRoute.FILM}${item.filmId}`}>
                        <p className={styles.filmName}>
                          {item.nameRu ? item.nameRu : '—'}
                        </p>
                        <p className={clsx(styles.filmName, styles.filmEnName)}>
                          {item.nameEn ? item.nameEn : '—'}
                        </p>
                        <span className={styles.filmActorRole}>
                          {item.description}
                        </span>
                      </Link>
                    </div>
                    <div>
                      <span className={styles.filmRating}>
                        {item.rating ? `Рейтинг ${item.rating}` : '—'}
                      </span>
                    </div>
                    <div>
                      <Link
                        className={styles.filmLink}
                        to={`${linkRoute.FILM}${item.filmId}`}
                      >
                        На страницу фильма
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {activeRole &&
            activeRole.films.length > 10 &&
            filmsShowed < activeRole.films.length && (
              <button
                className={styles.showMoreBtn}
                onClick={() => setFilmsShowed(filmsShowed + FACTS_COUNT)}
                type="button"
              >
                Показать ещё
              </button>
            )}
        </div>
      </section>
      {Boolean(data.facts.length) && (
        <section className={styles.facts}>
          <div className={clsx('container', styles.personContainer)}>
            <h2 className={styles.filmsTitle}>Интересные факты</h2>
            <ul className={styles.factsList}>
              {data.facts.slice(0, factsShowed).map((item: string) => (
                <li className={styles.fact} key={item.slice(0, 20)}>
                  {item}
                </li>
              ))}
            </ul>
            {data.facts.length > 10 && factsShowed < data.facts.length && (
              <button
                className={styles.showMoreBtn}
                onClick={() => setFactsShowed(factsShowed + FACTS_COUNT)}
                type="button"
              >
                Показать ещё
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Person;
