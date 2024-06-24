export const appRoute = {
  MAIN: '/',
  FILMS: '/films/',
  FILM: '/film/:id',
  SERIALS: '/serials',
  PERSON: '/person/:id',
};

export const linkRoute = {
  FILM: '/film/',
  PERSON: '/person/',
};

export const ratingName = {
  green: 'bg-green',
  orange: 'bg-orange',
  red: 'bg-red',
  grey: 'bg-grey',
};

export const spriteNames = {
  common: {
    search: 'search',
    login: 'login',
    sliderArrow: 'slider-arrow',
    favorite: 'favorite',
    details: 'details',
    close: 'close',
    burger: 'burger',
    caretBottom: 'caret-bottom',
    arrowRight: 'arrow-right',
    sort: 'sort',
    star: 'star',
    arrowRightSingle: 'arrowRightSingle',
  },
};

export const FACTS_COUNT = 10;

export const selectTypes = {
  genres: 'genres.name',
  rating: 'rating.kp',
  year: 'year',
  page: 'page',
  sortField: 'sortField',
  sortType: 'sortType',
};

export const sortTypes = [
  {
    name: 'умолчанию',
    id: '0',
  },
  {
    name: 'рейтингу',
    id: 'rating.kp',
  },
  {
    name: 'дате выхода',
    id: 'year',
  },
];

export const allGenresNames = [
  {
    title: 'Жанр',
    name: 'Любой жанр',
    id: '0',
  },
  {
    name: 'Боевик',
    id: 'боевик',
  },
  {
    name: 'Комедия',
    id: 'комедия',
  },
  {
    name: 'Триллер',
    id: 'триллер',
  },
  {
    name: 'Ужасы',
    id: 'ужасы',
  },
  {
    name: 'Фантастика',
    id: 'фантастика',
  },
  {
    name: 'Фэнтези',
    id: 'фэнтези',
  },
  {
    name: 'Детектив',
    id: 'детектив',
  },
  {
    name: 'Вестерн',
    id: 'вестерн',
  },
  {
    name: 'Драма',
    id: 'драма',
  },
  {
    name: 'Семейный',
    id: 'семейный',
  },
  {
    name: 'Музыка',
    id: 'музыка',
  },
  {
    name: 'Фильм-нуар',
    id: 'фильм-нуар',
  },
  {
    name: 'Криминал',
    id: 'криминал',
  },
  {
    name: 'Мелодрама',
    id: 'мелодрама',
  },
  {
    name: 'Биография',
    id: 'биография',
  },
  {
    name: 'Военный',
    id: 'военный',
  },
  {
    name: 'Детский',
    id: 'детский',
  },
  {
    name: 'Для взрослых',
    id: 'для взрослых',
  },
  {
    name: 'Документальный',
    id: 'документальный',
  },
  {
    name: 'Игра',
    id: 'игра',
  },
  {
    name: 'История',
    id: 'история',
  },
  {
    name: 'Концерт',
    id: 'концерт',
  },
  {
    name: 'Короткометражка',
    id: 'короткометражка',
  },
  {
    name: 'Мюзикл',
    id: 'мюзикл',
  },
  {
    name: 'Новости',
    id: 'новости',
  },
  {
    name: 'Приключения',
    id: 'приключения',
  },
  {
    name: 'Реальное ТВ',
    id: 'реальное ТВ',
  },
  {
    name: 'Спорт',
    id: 'спорт',
  },
  {
    name: 'Ток-шоу',
    id: 'ток-шоу',
  },
  {
    name: 'Церемония',
    id: 'церемония',
  },
];

export const moviesRating = [
  {
    title: 'Рейтинг',
    name: 'Любой',
    id: '0',
  },
  {
    name: 'от 5',
    id: '5-10',
  },
  {
    name: 'от 6',
    id: '6-10',
  },
  {
    name: 'от 7',
    id: '7-10',
  },
  {
    name: 'от 8',
    id: '8-10',
  },
  {
    name: 'от 9',
    id: '9-10',
  },
  {
    name: 'от 10',
    id: '10',
  },
];

export const yearsPublication = [
  {
    title: 'Год выхода',
    name: 'Любой год',
    id: '0',
  },
  {
    name: '2024',
    id: '2024',
  },
  {
    name: '2023',
    id: '2023',
  },
  {
    name: '2022',
    id: '2022',
  },
  {
    name: '2021',
    id: '2021',
  },
  {
    name: '2020',
    id: '2020',
  },
  {
    name: '2019',
    id: '2019',
  },
  {
    name: '2018',
    id: '2018',
  },
  {
    name: '2017',
    id: '2017',
  },
  {
    name: '2016',
    id: '2016',
  },
  {
    name: '2015',
    id: '2015',
  },
];
