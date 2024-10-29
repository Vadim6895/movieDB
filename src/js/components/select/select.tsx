import React, { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './select.module.scss';
import Icon from '../icon/icon';
import { spriteNames } from '../../const';
import { updateScrollPos } from '../../utils';

import { Option } from '../../types';

interface Props {
  parsedOption?: string | unknown;
  options: Option[];
  optionType: string;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  classModif?: string;
  extraOption?: { type: string; id: string };
  children?: ReactNode | undefined;
}

function Select({
  parsedOption,
  options,
  optionType,
  searchParams,
  setSearchParams,
  classModif,
  extraOption,
  children,
}: Props) {
  const defaultOption = parsedOption
    ? (options.find((item) => item.id === parsedOption) as Option)
    : options[0];
  const [openSelect, setOpenSelect] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(defaultOption);
  const [hoverItem, setHoverItem] = React.useState(defaultOption.id);
  const ref = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLUListElement>(null);

  const toggleSelect = React.useCallback(
    (bool: boolean) => {
      if (activeItem) setHoverItem(activeItem.id);
      setOpenSelect(bool);
    },
    [activeItem, setHoverItem],
  );

  const updateSearchParams = (id: string) => {
    if (id !== '0') {
      if (extraOption) {
        searchParams.set(extraOption.type, extraOption.id);
      }
      searchParams.set(optionType, id);
      setSearchParams(searchParams);
    } else {
      if (extraOption) {
        searchParams.delete(extraOption.type, extraOption.id);
      }
      searchParams.delete(optionType);
      setSearchParams(searchParams);
    }
  };

  function onKeyNav(evt: React.KeyboardEvent<HTMLDivElement>) {
    let index = options.findIndex((item) => item.id === hoverItem);

    if (evt.code === 'ArrowUp') {
      if (!openSelect) return;
      if (index - 1 < 0) index = options.length - 1;
      else index -= 1;
      evt.preventDefault();
      setHoverItem(options[index].id);
      updateScrollPos(activeItem, options, scrollRef, index);
    }

    if (evt.code === 'ArrowDown') {
      if (!openSelect) return;
      if (index + 1 > options.length - 1) index = 0;
      else index += 1;
      evt.preventDefault();
      setHoverItem(options[index].id);
      updateScrollPos(activeItem, options, scrollRef, index);
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

  const onClickOption = (item: Option) => {
    setActiveItem(item);
    setHoverItem(item.id);
    updateSearchParams(item.id);
  };

  const onMoveOption = (evt: React.MouseEvent<HTMLUListElement>) => {
    if (
      evt.target instanceof HTMLElement &&
      evt.target.classList.contains(styles.item)
    ) {
      const id = evt.target.getAttribute('data-id');
      if (id && id !== hoverItem) setHoverItem(id);
    }
  };

  React.useEffect(() => {
    function onClickOutSide(evt: MouseEvent) {
      const target = evt.target as HTMLElement;
      if (ref.current && !ref.current.contains(target)) {
        toggleSelect(false);
      }
    }
    function onEscKeyDown(evt: KeyboardEvent) {
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
      updateScrollPos(activeItem, options, scrollRef);
    }
  }, [openSelect, activeItem, options]);

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
        <Icon
          iconName={spriteNames.common.sliderArrow}
          className={clsx(styles.icon, openSelect && styles.iconOpen)}
        />
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

export default React.memo(Select);
