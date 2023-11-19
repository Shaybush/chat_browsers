export const getMinutesBetweenDates = (start, end) => {
  if (!start || !end) {
    return 0;
  } else {
    const hourDiff = end.getTime() - start.getTime();
    return Math.floor(hourDiff / 60 / 1000);
  }
};

export const getDaysBetweenDates = (start, end) => {
  if (!start || !end) {
    return 0;
  } else {
    return Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
};

export const getUplTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
