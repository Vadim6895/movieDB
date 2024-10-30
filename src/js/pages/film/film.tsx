import React from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { CSSTransition } from 'react-transition-group';

import { useGetFilmQuery, useGetPlayerFilmQuery } from '../../reducer/filmsApi';

import styles from './film.module.scss';
import ratingPopupStyles from '../../components/ratingPopup/ratingPopup.module.scss';
import basePopupStyles from '../../components/basePopup/basePopup.module.scss';
import PersonSlider from '../../components/personSlider/personSlider';
import RatingPopup from '../../components/ratingPopup/ratingPopup';
import YtPopup from '../../components/ytPopup/ytPopup';
import PlayerPopup from '../../components/playerPopup/playerPopup';
import FilmTabs from '../../components/filmTabs/filmTabs';
import Facts from '../../components/facts/facts';
import FilmBtn from '../../components/filmBtn/filmBtn';
import Icon from '../../components/icon/icon';
import { spriteNames, appRoute } from '../../const';
import Spinner from '../../components/spinner/spinner';
import {
  getMovieTime,
  transformPersons,
  getUniqueItemsByProperties,
} from '../../utils';
import FilmSlider from '../../components/filmSlider/filmSlider';

import { playerObj } from '../../types';

function Film() {
  const { id } = useParams();
  const [isRatingPopup, setRatingPopup] = React.useState(false);
  const [isYtPopup, setYtPopup] = React.useState(false);
  const [isPlayerPopup, setPlayerPopup] = React.useState(false);
  const { data = {}, isFetching, isError, error } = useGetFilmQuery(id);
  const { actors, otherPersons } = transformPersons(data.persons);
  const isDisabledTrailerBtn = !data?.videos?.trailers.length;
  const filteredTrailers = getUniqueItemsByProperties(data?.videos?.trailers, [
    'url',
  ]);
  const { data: playerData = [] } = useGetPlayerFilmQuery({ kinopoisk: id });
  const filteredPlayerData = playerData?.filter(
    (item: playerObj) => item.iframeUrl,
  );

  if (isFetching || isError)
    return (
      <section className={styles.film}>
        <div className={styles.backgroundContainer} />
        <div className={clsx('container', styles.content)}>
          {isFetching && <Spinner width={75} height={75} />}
          {isError && <h2>Error: {'message' in error ? error.message : ''}</h2>}
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
                  {data.countries &&
                    data.countries.map((country: { name: string }) => (
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
                    handler={setPlayerPopup}
                    disabled={!filteredPlayerData.length}
                  >
                    Смотреть онлайн
                  </FilmBtn>
                  <FilmBtn
                    trailer
                    handler={setYtPopup}
                    disabled={isDisabledTrailerBtn}
                  >
                    Трейлеры (
                    {data.videos?.trailers ? filteredTrailers.length : 0})
                  </FilmBtn>
                  <FilmBtn handler={setRatingPopup}>
                    <Icon
                      width={20}
                      height={20}
                      iconName={spriteNames.common.star}
                    />
                    <span>Оценить</span>
                  </FilmBtn>
                  <FilmBtn disabled>
                    <Icon
                      width={20}
                      height={20}
                      iconName={spriteNames.common.favorite}
                      fill="#fff"
                    />
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
        {Boolean(actors?.length) && <PersonSlider persons={actors || []} />}
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
            enter: basePopupStyles.popupEnter,
            enterActive: basePopupStyles.popupEnterActive,
            exit: basePopupStyles.popupExit,
            exitActive: basePopupStyles.popupExitActive,
          }}
        >
          <YtPopup data={filteredTrailers} setVisible={setYtPopup} />
        </CSSTransition>
        <CSSTransition
          in={isPlayerPopup}
          timeout={300}
          unmountOnExit
          classNames={{
            enter: basePopupStyles.popupEnter,
            enterActive: basePopupStyles.popupEnterActive,
            exit: basePopupStyles.popupExit,
            exitActive: basePopupStyles.popupExitActive,
          }}
        >
          <PlayerPopup data={filteredPlayerData} setVisible={setPlayerPopup} />
        </CSSTransition>
      </>
    );
}

export default Film;
