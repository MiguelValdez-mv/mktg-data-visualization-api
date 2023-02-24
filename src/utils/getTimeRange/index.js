import { sub, format } from "date-fns";

export const getTimeRange = ({ amount, unit }) => {
  const currDate = new Date();
  const pattern = "yyyy-MM-dd";

  const since = format(
    sub(currDate, { [`${unit.toLowerCase()}s`]: amount }),
    pattern
  );
  const until = format(currDate, pattern);

  return {
    since,
    until,
  };
};
