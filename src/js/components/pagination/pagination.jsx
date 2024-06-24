import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './pagination.module.scss';
import sprite from '../../../img/sprite.svg';
import { spriteNames } from '../../const';
import { calcPaginationArr } from '../../utils';
import useOnClickOutSide from '../../hooks/useOnClickOutside';

function Pagination({ pages, paramsPage, handler, filmsref }) {
  const activePage = Number(paramsPage) || 1;
  const { ref, isComponentVisible, setIsComponentVisible } =
    useOnClickOutSide(false);
  const inputRef = React.useRef(null);

  const updateScrollPos = () => {
    const yOffset =
      parseInt(
        getComputedStyle(document.body).getPropertyValue('--header-height'),
        10,
      ) * -1;
    const y =
      filmsref.current.getBoundingClientRect().top +
      window.scrollY +
      yOffset +
      -30;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const onClickLink = (evt, val) => {
    evt.preventDefault();
    if (activePage === val) return;
    handler(val);
    updateScrollPos();
  };

  const onSubmitForm = (evt) => {
    evt.preventDefault();
    const { value } = inputRef.current;
    if (Number(value) !== activePage) handler(value);
    setIsComponentVisible(false);
    updateScrollPos();
  };

  return (
    <div className={styles.pagination}>
      <ul className={styles.paginationList}>
        <li className={clsx(styles.paginationItem, styles.paginationItemStart)}>
          <a
            className={styles.paginationLink}
            href="#1"
            aria-label="Первая страница"
            onClick={(evt) => onClickLink(evt, 1)}
          >
            <svg className={styles.paginationIconFirst} width={15} height={15}>
              <use xlinkHref={`${sprite}#${spriteNames.common.arrowRight}`} />
            </svg>
          </a>
        </li>
        <li className={styles.paginationItem}>
          <a
            className={styles.paginationLink}
            href="#1"
            aria-label="Назад"
            onClick={(evt) => onClickLink(evt, activePage - 1)}
          >
            <svg className={styles.paginationIconFirst} width={15} height={15}>
              <use
                xlinkHref={`${sprite}#${spriteNames.common.arrowRightSingle}`}
              />
            </svg>
          </a>
        </li>
        {calcPaginationArr(activePage, pages).map((item) =>
          Number(item.val) ? (
            <li className={styles.paginationItem} key={item.id}>
              <a
                className={clsx(
                  styles.paginationLink,
                  item.val === activePage && styles.paginationLinkActive,
                )}
                href={`#${item.val}`}
                onClick={(evt) => onClickLink(evt, item.val)}
              >
                {item.val}
              </a>
            </li>
          ) : (
            <li className={styles.paginationItem} key={item.id}>
              <span className={styles.paginationLink}>{item.val}</span>
            </li>
          ),
        )}
        <li className={styles.paginationItem}>
          <a
            className={styles.paginationLink}
            href="#1"
            aria-label="Вперед"
            onClick={(evt) => onClickLink(evt, activePage + 1)}
          >
            <svg className={styles.paginationIconLast} width={15} height={15}>
              <use
                xlinkHref={`${sprite}#${spriteNames.common.arrowRightSingle}`}
              />
            </svg>
          </a>
        </li>
        <li className={clsx(styles.paginationItem, styles.paginationItemEnd)}>
          <a
            className={styles.paginationLink}
            href="#1"
            aria-label="Последняя страница"
            onClick={(evt) => onClickLink(evt, pages)}
          >
            <svg className={styles.paginationIconLast} width={15} height={15}>
              <use xlinkHref={`${sprite}#${spriteNames.common.arrowRight}`} />
            </svg>
          </a>
        </li>
      </ul>

      <div className={styles.paginationJump} ref={ref}>
        <button
          className={styles.paginationJumpBtn}
          type="button"
          onClick={() => setIsComponentVisible(!isComponentVisible)}
        >
          Страница {activePage} из {pages}
          <svg className={styles.paginationJumpIcon}>
            <use xlinkHref={`${sprite}#${spriteNames.common.caretBottom}`} />
          </svg>
        </button>
        {isComponentVisible && (
          <div className={styles.paginationJumpMenu}>
            <form method="post" action="" onSubmit={onSubmitForm}>
              <input
                className={styles.paginationJumpInput}
                type="number"
                min="1"
                max={pages}
                placeholder="Номер страницы"
                ref={inputRef}
              />
              <input
                className={styles.paginationJumpSubmitBtn}
                type="submit"
                value="Перейти"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  paramsPage: PropTypes.string,
  handler: PropTypes.func.isRequired,
  filmsref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

Pagination.defaultProps = {
  paramsPage: '',
  filmsref: () => {},
};

export default Pagination;
