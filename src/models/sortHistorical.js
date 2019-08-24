export const sortHistorical = (histData, start, end, year = undefined) => {
  // array of desired years
  const datesArr = year
    ? desiredMonths(start, end, year)
    : desiredYears(start, end);

  // const datesArr = desiredMonths(start, end, 2016);

  // create array of the data for the desired years
  let graphData = datesArr.map(e => {
    return dateData(histData.historical, e);
  });
  return graphData;
};

// create array of years from which to retreive data
const desiredYears = (start, end) => {
  let year = start;
  let yearArr = [];
  while (year <= end) {
    yearArr.push(`${year}`);
    year++;
  }
  return yearArr;
};

const desiredMonths = (start, end, year) => {
  let month = start;
  let monthArr = [];
  while (month <= end) {
    if (month < 10) {
      monthArr.push(`${year}-0${month}`);
    } else {
      monthArr.push(`${year}-${month}`);
    }
    month++;
  }
  return monthArr;
};

// const desiredDays = (start, end, month, year) => {
//   let day = start;
//   let dayArr = [];
//   while (day <= end)
// }

// returns the first data object from specified year
const dateData = (data, year) => {
  return data.find(e => {
    return e.date.includes(year);
  });
};
