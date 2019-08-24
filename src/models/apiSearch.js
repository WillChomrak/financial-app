//This needs to run on its own when app loads
const getCompList = async () => {
  const rawData = await fetch(
    `https://financialmodelingprep.com/api/v3/company/stock/list`
  );
  const data = await rawData.json();
  return data.symbolsList;
};

const getMostActive = async () => {
  const rawData = await fetch(
    `https://financialmodelingprep.com/api/v3/stock/actives`
  );
  const data = await rawData.json();
  return data.mostActiveStock;
};

const getProfile = async symbol => {
  const rawData = await fetch(
    `https://financialmodelingprep.com/api/v3/company/profile/${symbol}`
  );
  const data = await rawData.json();
  return data;
};

const getHistorical = async symbol => {
  const rawData = await fetch(
    `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}`
  );
  const data = await rawData.json();
  return data;
};

export { getCompList, getMostActive, getProfile, getHistorical };
