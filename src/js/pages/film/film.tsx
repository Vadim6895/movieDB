import React from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { CSSTransition } from 'react-transition-group';

import { useGetFilmQuery } from '../../reducer/filmsApi';

import styles from './film.module.scss';
import ratingPopupStyles from '../../components/ratingPopup/ratingPopup.module.scss';
import ytPopupStyles from '../../components/YtPopup/ytpopup.module.scss';
import PersonSlider from '../../components/personSlider/personSlider';
import RatingPopup from '../../components/ratingPopup/ratingPopup';
import YtPopup from '../../components/YtPopup/ytpopup';
import FilmTabs from '../../components/filmTabs/filmTabs';
import Facts from '../../components/facts/facts';
import FilmBtn from '../../components/filmBtn/filmBtn';
import sprite from '../../../img/sprite.svg';
import { spriteNames, appRoute } from '../../const';
import Spinner from '../../components/spinner/spinner';
import {
  getMovieTime,
  transformPersons,
  getUniqueItemsByProperties,
} from '../../utils';
import FilmSlider from '../../components/filmSlider/filmSlider';

function Film() {
  const { id } = useParams();
  const [isRatingPopup, setRatingPopup] = React.useState(false);
  const [isYtPopup, setYtPopup] = React.useState(false);
  const { data = {}, isFetching, isError, error } = useGetFilmQuery(id);
  const { actors, otherPersons } = transformPersons(data.persons);
  const isDisabledBtn = data.videos ? !data.videos.trailers.length : true;
  const filteredTrailers = getUniqueItemsByProperties(data?.videos?.trailers, [
    'url',
  ]);

  console.log(data);

  if (isFetching || isError)
    return (
      <section className={styles.film}>
        <div className={styles.backgroundContainer} />
        <div className={clsx('container', styles.content)}>
          {isFetching && <Spinner width={75} height={75} />}
          {isError && <span>{'message' in error ? error.message : ''}</span>}
        </div>
      </section>
    );

  if (data.id)
    return (
      <>
        <section className={styles.film}>
          <div
            className={styles.backgroundContainer}
            style={{ backgroundImage: `url(${data.backdrop?.url})` }}
          />
          <div className={clsx('container', styles.content)}>
            <div className={styles.wrapper}>
              <img
                className={styles.poster}
                src={data.poster.previewUrl}
                alt="poster"
              />
              <div className={styles.filmBLocksWrapper}>
                <h1 className={styles.title}>{data.name}</h1>
                <p className={styles.titleEng}>{data.alternativeName}</p>
                <div>
                  <span className={styles.info}>{data.year}</span>
                  <span className={styles.info}>
                    {data.ageRating && `${data.ageRating}+`}
                  </span>
                  {data.countries.map((country: { name: string }) => (
                    <span className={styles.info} key={country.name}>
                      {country.name}
                    </span>
                  ))}
                  {data.movieLength && (
                    <span className={styles.info}>
                      {data.movieLength} мин.{' '}
                      {data.movieLength > 60
                        ? `/ ${getMovieTime(data.movieLength)}`
                        : ''}
                    </span>
                  )}
                </div>
                <p className={styles.description}>{data.shortDescription}</p>
                <div>
                  {data.genres?.map((genre: { name: string }) => (
                    <Link
                      className={styles.genreLink}
                      to={`${appRoute.FILMS}?genres.name=${genre.name}`}
                      key={genre.name}
                    >
                      <span>{genre.name}</span>
                    </Link>
                  ))}
                </div>
                <div className={styles.btnsWrapper}>
                  <FilmBtn
                    trailer
                    handler={setYtPopup}
                    disabled={isDisabledBtn}
                  >
                    Трейлеры (
                    {data.videos?.trailers ? filteredTrailers.length : 0})
                  </FilmBtn>
                  <FilmBtn handler={setRatingPopup}>
                    <svg width={20} height={20}>
                      <use xlinkHref={`${sprite}#${spriteNames.common.star}`} />
                    </svg>
                    <span>Оценить</span>
                  </FilmBtn>
                  <FilmBtn disabled>
                    <svg width={20} height={20} fill="#fff">
                      <use
                        xlinkHref={`${sprite}#${spriteNames.common.favorite}`}
                      />
                    </svg>
                    <span>Запомнить</span>
                  </FilmBtn>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FilmTabs
          description={data.description}
          ratingKp={data.rating.kp}
          ratingImdb={data.rating.imdb}
        />
        {Boolean(data.similarMovies?.length) && (
          <FilmSlider title="Похожие фильмы" data={data.similarMovies} />
        )}
        {Boolean(data.sequelsAndPrequels?.length) && (
          <FilmSlider
            title="Сиквелы и приквелы"
            data={data.sequelsAndPrequels}
          />
        )}
        {Boolean(actors) && <PersonSlider persons={actors || []} />}
        <section className={styles.authors}>
          <div className="container">
            <h2 className={styles.filmCrew}>Cъёмочная группа</h2>
            <ul className={styles.authorsList}>
              {otherPersons?.map((category) => (
                <li className={styles.authorsItem} key={category[0].profession}>
                  <p className={styles.authorsTitle}>
                    {category[0].profession}:
                  </p>
                  <p className={styles.authorsName}>
                    {category.map((actor, i) => (
                      <span key={actor.id}>
                        {actor.name ? actor.name : actor.enName}
                        {i + 1 !== category.length && ', '}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {Boolean(data.facts?.length) && <Facts facts={data.facts} />}
        <CSSTransition
          in={isRatingPopup}
          timeout={300}
          unmountOnExit
          classNames={{
            enter: ratingPopupStyles.popupEnter,
            enterActive: ratingPopupStyles.popupEnterActive,
            exit: ratingPopupStyles.popupExit,
            exitActive: ratingPopupStyles.popupExitActive,
          }}
        >
          <RatingPopup setVisible={setRatingPopup} />
        </CSSTransition>
        <CSSTransition
          in={isYtPopup}
          timeout={300}
          unmountOnExit
          classNames={{
            enter: ytPopupStyles.popupEnter,
            enterActive: ytPopupStyles.popupEnterActive,
            exit: ytPopupStyles.popupExit,
            exitActive: ytPopupStyles.popupExitActive,
          }}
        >
          <YtPopup data={filteredTrailers} setVisible={setYtPopup} />
        </CSSTransition>
      </>
    );
}

export default Film;
