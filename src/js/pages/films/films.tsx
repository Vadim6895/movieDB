import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetFilmsQuery } from '../../reducer/filmsApi';

import styles from './films.module.scss';
import Select from '../../components/select/select';
import Pagination from '../../components/pagination/pagination';
import FilmsContainer from '../../components/filmsContainer/filmsContainer';
import Spinner from '../../components/spinner/spinner';
import {
  allGenresNames,
  moviesRating,
  yearsPublication,
  selectTypes,
  sortTypes,
  spriteNames,
} from '../../const';
import { paramsToObject, getPageTitle } from '../../utils';
import sprite from '../../../img/sprite.svg';

function Films(params: { type: string }) {
  const { type } = params;
  const [searchParams, setSearchParams] = useSearchParams();
  const filmsRef = React.useRef<HTMLDivElement>(null);
  const parsedParams = paramsToObject(searchParams);
  const hasReset = !!Object.keys(parsedParams).length;
  const {
    data = [],
    error,
    isLoading,
    isFetching,
    isError,
  } = useGetFilmsQuery({ ...parsedParams, type, limit: 42 });

  const onPaginationClick = (value: number | string) => {
    searchParams.set(selectTypes.page, String(value));
    setSearchParams(searchParams);
  };

  const resetParams = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <section className={styles.films}>
      <div className="container">
        <h1 className={styles.title}>{getPageTitle(type)}</h1>

        <div className={styles.controls}>
          <div className={styles.filters}>
            <div className={styles.filtersWrapper}>
              <Select
                parsedOption={parsedParams[selectTypes.genres]}
                options={allGenresNames}
                optionType={selectTypes.genres}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
              <Select
                parsedOption={parsedParams[selectTypes.rating]}
                options={moviesRating}
                optionType={selectTypes.rating}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
              <Select
                parsedOption={parsedParams[selectTypes.year]}
                options={yearsPublication}
                optionType={selectTypes.year}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
              {hasReset && (
                <button
                  className={styles.resetBtn}
                  type="button"
                  onClick={resetParams}
                >
                  Сбросить
                </button>
              )}
            </div>
            <Select
              parsedOption={parsedParams[selectTypes.sortField]}
              options={sortTypes}
              optionType={selectTypes.sortField}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              classModif="Sort"
              extraOption={{ type: selectTypes.sortType, id: '-1' }}
            >
              <svg className={styles.sortIcon}>
                <use xlinkHref={`${sprite}#${spriteNames.common.sort}`} />
              </svg>
              <span className={styles.sortTextMob}>По: </span>
              <span className={styles.sortText}>Сортировать по: </span>
            </Select>
          </div>
          {isLoading && <Spinner width={75} height={75} />}
          {isError && <h2>Error: {'message' in error ? error.message : ''}</h2>}
          {Boolean(!data.docs?.length) && !isLoading && !isError && (
            <h2>Ничего не найдено</h2>
          )}
          {Boolean(data.docs?.length) && (
            <>
              <FilmsContainer
                films={data}
                filmsref={filmsRef}
                loading={isFetching}
              />
              <Pagination
                pages={data.pages}
                paramsPage={searchParams.get(selectTypes.page)}
                handler={onPaginationClick}
                filmsref={filmsRef}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Films;
