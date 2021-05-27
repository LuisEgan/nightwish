interface IGetDatesDifference {
  date1: Date;
  date2: Date;
  unit?: "seconds" | "minutes" | "hours";
}

/**
 * Returns the difference in seconds, minutes or hours between 2 dates
 * If the result is negative it means the date1 is older than date2
 * @param {IGetDatesDifference} params
 */
export const getDatesDifference = (params: IGetDatesDifference) => {
  const { date1, date2, unit = "seconds" } = params;

  let diff = (date1.getTime() - date2.getTime()) / 1000;

  if (unit === "minutes") {
    diff /= 60;
  }

  if (unit === "hours") {
    diff /= 3600;
  }

  return diff;
};

export default {};
