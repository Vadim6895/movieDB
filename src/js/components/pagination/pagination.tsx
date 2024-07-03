import React, { RefObject } from 'react';
import clsx from 'clsx';

import styles from './pagination.module.scss';
import sprite from '../../../img/sprite.svg';
import { spriteNames } from '../../const';
import { calcPaginationArr } from '../../utils';
import useOnClickOutSide from '../../hooks/useOnClickOutside';

interface Props {
  pages: number;
  // eslint-disable-next-line react/require-default-props
  paramsPage?: string | null;
  handler: (v: number | string) => void;
  // eslint-disable-next-line react/require-default-props
  filmsref?: RefObject<HTMLDivElement>;
}

function Pagination({ pages, paramsPage, handler, filmsref }: Props) {
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
    const y = filmsref?.current
      ? filmsref.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset +
        -30
      : 0;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const onClickLink = (evt: React.MouseEvent, val: number | string) => {
    evt.preventDefault();
    if (activePage === val) return;
    handler(val);
    updateScrollPos();
  };

  const onSubmitForm = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!inputRef || !inputRef.current) return;
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

export default Pagination;
