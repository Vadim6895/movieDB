import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './select.module.scss';
import sprite from '../../../img/sprite.svg';
import { spriteNames } from '../../const';

function Select({
  parsedOption,
  options,
  optionType,
  searchParams,
  setSearchParams,
  classModif,
  extraOption,
  children,
}) {
  const defaultOption = parsedOption
    ? options.find((item) => item.id === parsedOption)
    : options[0];
  const [openSelect, setOpenSelect] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(defaultOption);
  const [hoverItem, setHoverItem] = React.useState(defaultOption.id);
  const ref = React.useRef(null);
  const scrollRef = React.useRef(null);

  function updateScrollPos(index) {
    let indexOpt = index;
    if (!index) {
      indexOpt = options.findIndex((item) => item.id === activeItem.id);
    }
    const actualEl = scrollRef.current.childNodes[indexOpt];
    const listPosTop = scrollRef.current.getBoundingClientRect().top;
    const elPosTop = actualEl.getBoundingClientRect().top;

    if (elPosTop < listPosTop) {
      const difference = listPosTop - elPosTop;
      scrollRef.current.scrollBy(0, -difference - 10);
    }

    const listPosBottom = scrollRef.current.getBoundingClientRect().bottom;
    const elPosBottom = actualEl.getBoundingClientRect().bottom;

    if (elPosBottom > listPosBottom) {
      const difference = elPosBottom - listPosBottom;
      scrollRef.current.scrollBy(0, difference + 10);
    }
  }

  const toggleSelect = React.useCallback(
    (bool) => {
      if (activeItem) setHoverItem(activeItem.id);
      setOpenSelect(bool);
    },
    [activeItem, setHoverItem],
  );

  const updateSearchParams = (id) => {
    if (id !== '0') {
      if (extraOption.type) {
        searchParams.set(extraOption.type, extraOption.id);
      }
      searchParams.set(optionType, id);
      setSearchParams(searchParams);
    } else {
      if (extraOption.type) {
        searchParams.delete(extraOption.type, extraOption.id);
      }
      searchParams.delete(optionType);
      setSearchParams(searchParams);
    }
  };

  function onKeyNav(evt) {
    let index = options.findIndex((item) => item.id === hoverItem);

    if (evt.code === 'ArrowUp') {
      if (!openSelect) return;
      if (index - 1 < 0) index = options.length - 1;
      else index -= 1;
      evt.preventDefault();
      setHoverItem(options[index].id);
      updateScrollPos(index);
    }

    if (evt.code === 'ArrowDown') {
      if (!openSelect) return;
      if (index + 1 > options.length - 1) index = 0;
      else index += 1;
      evt.preventDefault();
      setHoverItem(options[index].id);
      updateScrollPos(index);
    }

    if (evt.code === 'Enter' || evt.code === 'Space') {
      if (openSelect) {
        setActiveItem(options[index]);
      }
      updateSearchParams(options[index].id);
      evt.preventDefault();
      toggleSelect(!openSelect);
    }
  }

  const onClickOption = (item) => {
    setActiveItem(item);
    setHoverItem(item.id);
    updateSearchParams(item.id);
  };

  const onMoveOption = (evt) => {
    if (evt.target.classList.contains(styles.item)) {
      const id = evt.target.getAttribute('data-id');
      if (id !== hoverItem) setHoverItem(id);
    }
  };

  React.useEffect(() => {
    function onClickOutSide(evt) {
      if (ref.current && !ref.current.contains(evt.target)) {
        toggleSelect(false);
      }
    }
    function onEscKeyDown(evt) {
      if (evt.key === 'Escape') {
        toggleSelect(false);
      }
    }

    document.addEventListener('click', onClickOutSide);
    document.addEventListener('keydown', onEscKeyDown);
    return () => {
      document.removeEventListener('click', onClickOutSide);
      document.removeEventListener('keydown', onEscKeyDown);
    };
  }, [toggleSelect]);

  React.useEffect(() => {
    if (activeItem && openSelect) {
      updateScrollPos();
    }
  }, [openSelect]);

  React.useEffect(() => {
    if (!parsedOption) setActiveItem(options[0]);
  }, [parsedOption, options]);

  return (
    <div
      className={clsx(
        styles.select,
        classModif && styles[`select${classModif}`],
      )}
      tabIndex={0}
      role="button"
      ref={ref}
      onClick={() => toggleSelect(!openSelect)}
      onKeyDown={onKeyNav}
    >
      <div className={styles.value}>
        {children}
        <span className={styles.text}>
          {activeItem.title || activeItem.name}
        </span>
        <svg className={clsx(styles.icon, openSelect && styles.iconOpen)}>
          <use xlinkHref={`${sprite}#${spriteNames.common.sliderArrow}`} />
        </svg>
      </div>
      {openSelect && (
        <ul className={styles.list} ref={scrollRef} onMouseMove={onMoveOption}>
          {options.map((item) => (
            <li key={item.id}>
              <div
                data-id={item.id}
                role="button"
                tabIndex={-1}
                className={clsx(
                  styles.item,
                  activeItem.id === item.id && styles.itemActive,
                  hoverItem === item.id && styles.itemHover,
                )}
                onClick={() => onClickOption(item)}
                onKeyDown={() => onClickOption(item)}
              >
                {item.name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Select.propTypes = {
  parsedOption: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  optionType: PropTypes.string.isRequired,
  searchParams: PropTypes.instanceOf(URLSearchParams).isRequired,
  setSearchParams: PropTypes.func.isRequired,
  classModif: PropTypes.string,
  extraOption: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
  }),
  children: PropTypes.node,
};

Select.defaultProps = {
  children: '',
  classModif: '',
  parsedOption: '',
  extraOption: {},
};

export default React.memo(Select);
