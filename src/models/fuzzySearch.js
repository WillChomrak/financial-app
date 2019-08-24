import Fuse from "fuse.js";

export const getFuzzyMatch = (data, query) => {
  const options = {
    shouldSort: true,
    includeScore: true,
    threshold: 0.25,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name", "symbol"]
  };
  var fuse = new Fuse(data, options);
  const result = fuse.search(query);
  // result = [{item: {symbol: "", name: "", price: 0}, score: 0}, ...]
  // returns array with one or more matches
  // must write contingency for no matches
  return result;
};
