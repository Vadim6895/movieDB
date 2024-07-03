import { ratingName } from './const';
import {
  Person,
  dynamicPersonObject,
  dynamicKeysObject,
  Trailer,
} from './types';

export const getRatingColor = (rating: string | number | undefined) => {
  if (!rating) return null;
  const number = Number(rating);
  if (number >= 7) return ratingName.green;
  if (number >= 5) return ratingName.orange;
  if (number < 5) return ratingName.red;
  return ratingName.grey;
};

export const getMovieTime = (duration: number) => {
  if (!duration) return '';
  if (duration < 60) {
    return `${duration} мин`;
  }
  if (duration >= 60 && duration % 60 === 0) {
    return `${(duration / 60).toFixed()} ч`;
  }
  const hours = duration / 60;
  const minutes = duration % 60;
  return `${hours.toFixed()} ч ${minutes} мин`;
};

export const transformPersons = (persons: Person[]) => {
  if (!persons) return {};
  const sortedPersons: dynamicPersonObject = {};
  const otherPersons: Person[][] = [];

  persons.forEach((item) => {
    if (!Object.hasOwn(sortedPersons, item.enProfession)) {
      sortedPersons[item.enProfession] = [];
      sortedPersons[item.enProfession].push(item);
    } else {
      sortedPersons[item.enProfession].push(item);
    }
  });

  Object.keys(sortedPersons).forEach((key) => {
    if (key !== 'actor') {
      otherPersons.push(sortedPersons[key]);
    }
  });

  return { actors: sortedPersons.actor || [], otherPersons };
};

export const youtubeParser = (url: string) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};

export const paramsToObject = (searchParams: URLSearchParams) => {
  const result: dynamicKeysObject = {};
  /* eslint-disable-next-line */
  for (const [key, value] of searchParams) {
    result[key] = value;
  }
  return result;
};

export const calcPaginationArr = (activePage: number, pages: number) => {
  const arr: { id: number | string; val: number | string }[] = [];
  let min = 0;
  let max = 0;

  for (let i = activePage - 2; i <= activePage + 2; i += 1) {
    if (i > 0 && i <= pages) arr.push({ id: i, val: i });
    if (i <= 0) min += 1;
    if (i > pages) max += 1;
  }

  if (min) {
    for (let i = 1; i <= min; i += 1) {
      if (Number(arr[arr.length - 1].val) < pages) {
        const { val } = arr[arr.length - i];
        arr.push({ id: Number(val) + i, val: Number(val) + i });
      }
    }
  }

  if (max) {
    for (let i = 1; i <= max; i += 1) {
      if (Number(arr[0].val) > 1) {
        arr.unshift({
          id: Number(arr[0].val) - 1,
          val: Number(arr[0].val) - 1,
        });
      }
    }
  }

  if (Number(arr[arr.length - 1].val) + 1 === pages) {
    arr.push({ id: pages, val: pages });
  } else if (Number(arr[arr.length - 1].val) + 1 < pages) {
    arr.push({ id: 'dots1', val: '...' }, { id: pages, val: pages });
  }

  if (Number(arr[0].val) - 1 === 1) {
    arr.unshift({ id: 1, val: 1 });
  } else if (Number(arr[0].val) - 1 > 1) {
    arr.unshift({ id: 1, val: 1 }, { id: 'dots2', val: '...' });
  }

  return arr;
};

const isPropValuesEqual = (
  subject: Trailer,
  target: Trailer,
  propNames: string[],
) =>
  propNames.every((propName: string) => subject[propName] === target[propName]);

export const getUniqueItemsByProperties = (
  items: Trailer[],
  propNames: string[],
) => {
  if (!items) return [];
  return items.filter(
    (item, index, array) =>
      index ===
      array.findIndex((foundItem) =>
        isPropValuesEqual(foundItem, item, propNames),
      ),
  );
};
