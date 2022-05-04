import { DateTime } from 'luxon';

// export const dateToSeconds = (date: null | string) => {
//   return date ? DateTime.fromFormat(date, 'yyyy-MM-dd').toSeconds() : null;
// };

export const dateToSeconds = (
  date: null | string,
  toEndDate: boolean = false
) => {
  if (typeof date === 'string') {
    return date
      ? DateTime.fromFormat(
          toEndDate === true ? `${date} 23:59:59` : `${date} 00:00:00`,
          'yyyy-MM-dd HH:mm:ss'
        ).toSeconds()
      : null;
  }
  return date ? DateTime.fromFormat(date, 'yyyy-MM-dd').toSeconds() : null;
};

export const dateToString = (date: null | number): null | string => {
  return date ? DateTime.fromSeconds(date).toFormat('yyyy-MM-dd') : null;
};

export const dateAndTimeToSeconds = (date: null | string) => {
  return date
    ? DateTime.fromFormat(date, 'yyyy-MM-dd HH:mm').toSeconds()
    : null;
};

export const dateAndTimeToString = (date: null | number): null | string => {
  return date ? DateTime.fromSeconds(date).toFormat('yyyy-MM-dd HH:mm') : null;
};
