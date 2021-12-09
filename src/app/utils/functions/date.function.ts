import { DateTime } from 'luxon';

export const dateToSeconds = (date: null | string) => {
  return date
    ? DateTime.fromFormat(date, 'dd-MM-yyyy HH:mm').toSeconds()
    : null;
};

export const dateToString = (date: null | number): null | string => {
  return date ? DateTime.fromSeconds(date).toFormat('dd-MM-yyyy HH:mm') : null;
};

export const dateAndTimeToSeconds = (date: null | string) => {
  return date
    ? DateTime.fromFormat(date, 'dd-MM-yyyy HH:mm').toSeconds()
    : null;
};

export const dateAndTimeToString = (date: null | number): null | string => {
  return date ? DateTime.fromSeconds(date).toFormat('dd-MM-yyyy HH:mm') : null;
};
