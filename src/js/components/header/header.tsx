import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import debounce from 'lodash.debounce';
import { CSSTransition } from 'react-transition-group';

import { useLazySearchFilmQuery } from '../../reducer/filmsApi';

import styles from './header.module.scss';
import logoDesktop from '../../../img/logo-desktop.svg';
import logoMobile from '../../../img/logo-mobile.svg';
import Icon from '../icon/icon';
import { spriteNames, appRoute, linkRoute } from '../../const';
import Spinner, { SmallSpinner } from '../spinner/spinner';

interface SearchFilm {
  filmId: number;
  posterUrlPreview?: string;
  nameRu?: string;
  nameEn?: string;
  year?: string;
  rating?: string;
}

const setActiveLink = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.activeLink}` : styles.link;

function Header() {
  const [isOpen, setOpenMenu] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const [search, setOpenSearch] = React.useState(false);
  const [typing, setTyping] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [textRequest, setTextRequest] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [fetchFilms, { data = { films: [] }, error, isFetching, isError }] =
    useLazySearchFilmQuery();

  const toggleMenu = (open: boolean) => {
    if (window.matchMedia('(min-width: 1024px)').matches) return;
    if (open) {
      document.body.setAttribute('style', '');
      setOpenMenu(false);
    } else {
      document.body.setAttribute('style', 'overflow: hidden;');
      setOpenMenu(true);
      setOpenSearch(false);
    }
  };

  React.useEffect(() => {
    let prevPos = window.scrollY;
    window.addEventListener('scroll', () => {
      if (!headerRef || !headerRef.current) return;
      const currentPos = window.scrollY;
      const openedSearch = headerRef.current.classList.contains('headerSearch');
      if (currentPos > prevPos && !openedSearch) {
        headerRef.current.classList.add(styles.headerOut);
        prevPos = currentPos;
      } else {
        headerRef.current.classList.remove(styles.headerOut);
        prevPos = currentPos;
      }
    });
  }, []);

  const setSearchPage = () => {
    setPage(page + 1);
    fetchFilms({
      type: 'page',
      params: { keyword: searchText, page: page + 1 },
    });
  };

  const clearSearch = () => {
    setSearchText('');
    fetchFilms({
      type: 'text',
      params: { keyword: '' },
    });
  };

  const debouncedRequest = React.useCallback(
    debounce((value) => {
      setTyping(false);
      fetchFilms({
        type: 'text',
        params: { keyword: value },
      })
        .then(() => {
          setTextRequest(false);
        })
        .catch(() => {
          setTextRequest(false);
        });
    }, 1000),
    [fetchFilms],
  );

  const setSearchKeyword = (evt: React.ChangeEvent) => {
    const { value } = evt.target as HTMLInputElement;
    setTyping(true);
    setPage(1);
    setTextRequest(true);
    setSearchText(value);
    debouncedRequest(value);
  };

  const toggleSearch = (open: boolean) => {
    function onEscKeyDown(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        setOpenSearch(false);
        clearSearch();
        document.body.setAttribute('style', '');
        document.removeEventListener('keydown', onEscKeyDown);
      }
    }

    if (open) {
      document.body.setAttribute('style', 'overflow: hidden;');
      document.addEventListener('keydown', onEscKeyDown);
      setOpenSearch(true);
      setOpenMenu(false);
    } else {
      document.body.setAttribute('style', '');
      document.removeEventListener('keydown', onEscKeyDown);
      clearSearch();
      setOpenSearch(false);
    }
  };

  return (
    <header
      className={clsx(styles.header, search && 'headerSearch')}
      ref={headerRef}
    >
      <div className={clsx('container', styles.headerWrapper)}>
        <Link to={appRoute.MAIN}>
          <picture>
            <source
              srcSet={String(logoDesktop)}
              media="(min-width: 768px)"
              width="180px"
            />
            <img className={styles.logo} src={String(logoMobile)} alt="logo" />
          </picture>
        </Link>
        <nav className={clsx(styles.nav, isOpen && styles.navOpen)}>
          {search ? (
            <div className={styles.search}>
              <div className={styles.searchInputWrapper}>
                <Icon
                  width={24}
                  height={24}
                  iconName={spriteNames.common.search}
                  className={styles.headerIcon}
                />
                <input
                  className={styles.searchInput}
                  // eslint-disable-next-line
                  autoFocus
                  type="text"
                  value={searchText}
                  placeholder="Название фильма или сериала"
                  onChange={setSearchKeyword}
                />
              </div>
            </div>
          ) : (
            <ul className={styles.list}>
              <li>
                <NavLink
                  className={setActiveLink}
                  to={appRoute.MAIN}
                  onClick={() => toggleMenu(isOpen)}
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={setActiveLink}
                  to={appRoute.FILMS}
                  onClick={() => toggleMenu(isOpen)}
                >
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={setActiveLink}
                  to={appRoute.SERIALS}
                  onClick={() => toggleMenu(isOpen)}
                >
                  Сериалы
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={setActiveLink}
                  to={appRoute.CARTOON}
                  onClick={() => toggleMenu(isOpen)}
                >
                  Мультфильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={setActiveLink}
                  to={appRoute.ANIMATED_SERIES}
                  onClick={() => toggleMenu(isOpen)}
                >
                  Мультсериалы
                </NavLink>
              </li>
            </ul>
          )}
        </nav>

        <div className={styles.headerControls}>
          <button
            className={styles.headerBtn}
            type="button"
            onClick={() => toggleSearch(!search)}
          >
            {search ? (
              <Icon
                width={24}
                height={24}
                iconName={spriteNames.common.close}
                className={styles.headerIcon}
              />
            ) : (
              <>
                <Icon
                  width={24}
                  height={24}
                  iconName={spriteNames.common.search}
                  className={styles.headerIcon}
                />
                <span className={styles.headerBtnText}>Поиск</span>
              </>
            )}
          </button>
          <Link
            className={clsx(styles.linkFavorite, styles.linkDisabled)}
            to={appRoute.MAIN}
          >
            <Icon
              width={24}
              height={24}
              iconName={spriteNames.common.favorite}
              className={styles.headerIcon}
            />
            <span className={styles.headerBtnText}>Избранное</span>
          </Link>
          <button className={styles.headerBtn} type="button" disabled>
            <Icon
              width={24}
              height={24}
              iconName={spriteNames.common.login}
              className={styles.headerIcon}
            />
            <span className={styles.headerBtnText}>Войти</span>
          </button>
          <button
            className={styles.burgerBtn}
            type="button"
            aria-label="burger"
            onClick={() => toggleMenu(isOpen)}
          >
            <Icon
              width={30}
              height={30}
              iconName={
                isOpen ? spriteNames.common.close : spriteNames.common.burger
              }
              className={styles.headerIcon}
            />
          </button>
        </div>
      </div>
      {search && (
        <div className={clsx('container', styles.searchMob)}>
          <Icon
            width={24}
            height={24}
            iconName={spriteNames.common.search}
            className={styles.searchIconMob}
          />
          <input
            className={styles.searchInputMob}
            // eslint-disable-next-line
            autoFocus
            type="text"
            value={searchText}
            placeholder="Название фильма или сериала"
            onChange={setSearchKeyword}
          />
          <button
            className={styles.searchInputResetBtn}
            type="button"
            onClick={clearSearch}
          >
            <Icon width={14} height={14} iconName={spriteNames.common.close} />
            <span className="visually-hidden">Очистить поле ввода</span>
          </button>
        </div>
      )}
      <CSSTransition
        in={search}
        timeout={300}
        unmountOnExit
        classNames={{
          enter: styles.searchWrapperEnter,
          enterActive: styles.searchWrapperActive,
          exit: styles.searchWrapperExit,
          exitActive: styles.searchWrapperExitActive,
        }}
      >
        <>
          <div className={styles.searchWrapper}>
            <div
              className={clsx(
                styles.searchContainer,
                textRequest && styles.searchWrapperLoading,
              )}
            >
              {textRequest && <Spinner width={75} height={75} />}
              {isError && (
                <h2>Error: {'message' in error ? error.message : ''}</h2>
              )}
              {!data.films.length &&
                !isError &&
                searchText &&
                !isFetching &&
                !typing && (
                  <>
                    <h2 className={styles.searchTitle}>Результаты:</h2>
                    <h2 className={styles.searchNotFound}>Ничего не найдено</h2>
                  </>
                )}
              {Boolean(data.films.length) && !textRequest && (
                <>
                  <h2 className={styles.searchTitle}>Результаты:</h2>
                  <div className={styles.searchGrid}>
                    {data.films.map((item: SearchFilm) => (
                      <Link
                        className={styles.searchItemLink}
                        to={linkRoute.FILM + item.filmId}
                        onClick={() => toggleSearch(false)}
                        key={item.filmId}
                      >
                        <img
                          className={styles.searchItemPoster}
                          src={item.posterUrlPreview}
                          alt="постер"
                          loading="lazy"
                        />
                        <div className={styles.searchItemWrapper}>
                          <p className={styles.searchItemTitle}>
                            {item.nameRu || item.nameEn}
                          </p>
                          <div>
                            {Boolean(Number(item.year)) && (
                              <span className={styles.searchItemYear}>
                                {item.year}
                              </span>
                            )}
                            {Boolean(Number(item.rating)) && (
                              <span className={styles.searchItemRating}>
                                {item.rating}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {data.pagesCount > 1 && (
                    <button
                      className={styles.searchBtnShowMore}
                      type="button"
                      onClick={setSearchPage}
                    >
                      {isFetching ? (
                        <SmallSpinner width={18} height={18} />
                      ) : (
                        'Показать больше'
                      )}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div
            role="presentation"
            className={styles.searchBlur}
            onClick={() => toggleSearch(false)}
          />
        </>
      </CSSTransition>
    </header>
  );
}

export default Header;
