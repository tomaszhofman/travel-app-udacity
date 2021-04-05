import dayjs from 'dayjs'; // ES 2015
dayjs().format();

export const countdown = (date) => {
  const newDate = Math.floor(
    Math.abs(date - new Date()) / (1000 * 60 * 60 * 24)
  );
  return newDate;
};

// countdown('13/12/2021');

// console.log(time);
