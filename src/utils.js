export const isBrowser = (() => {
  try {
    return !!window
  } catch (e) {
    return false;
  }
})();

export const getUrlParams = (search) => {
  if (!search) return {};
  const vars = search.substring(1).split('&');
  const queryString = {};
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1]);
    if (typeof queryString[key] === 'undefined') {
      queryString[key] = decodeURIComponent(value);
    } else if (typeof queryString[key] === 'string') {
      queryString[key] = [queryString[key], decodeURIComponent(value)];
    } else {
      queryString[key].push(decodeURIComponent(value));
    }
  }
  return queryString;
};
