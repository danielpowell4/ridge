import * as React from "react";
import { useRouter } from "next/router";

import { parse as parseQS, stringify as stringifyQS } from "qs";
const buildQueryString = (object) =>
  stringifyQS(object, { arrayFormat: "indices" });
const parseQueryString = (string) =>
  parseQS(string, { ignoreQueryPrefix: true, arrayFormat: "indices" });

// turns location.search into object with an updater
// Example: "?category_id=23" => { category_id: 23 }

// per https://github.com/ljharb/qs#parsing-primitivescalar-values-numbers-booleans-null-etc

function isObject(val) {
  return val.constructor === Object;
}

function isNumber(val) {
  return !isNaN(parseFloat(val)) && isFinite(val);
}

function isBoolean(val) {
  return val === "false" || val === "true";
}

function isArray(val) {
  return Array.isArray(val);
}

function parseValue(val) {
  if (typeof val == "undefined" || val == "") {
    return null;
  } else if (isBoolean(val)) {
    return parseBoolean(val);
  } else if (isArray(val)) {
    return parseArray(val);
  } else if (isObject(val)) {
    return parseObject(val);
  } else if (isNumber(val)) {
    return parseNumber(val);
  } else {
    return val;
  }
}

function parseObject(obj) {
  const result = {};
  for (let key in obj) {
    const val = parseValue(obj[key]);
    if (val !== null) result[key] = val; // ignore null values
  }
  return result;
}

function parseArray(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result[i] = parseValue(arr[i]);
  }
  return result;
}

function parseNumber(val) {
  return Number(val);
}

function parseBoolean(val) {
  return val === "true";
}

const useSearch = () => {
  const router = useRouter();
  const location = window.location;

  const search = React.useMemo(() => {
    const stringWrapped = parseQueryString(location.search);
    return parseValue(stringWrapped);
  }, [location.search]);

  const setSearch = React.useCallback(
    (nextAttrs, replace = true) =>
      router.push({
        pathname: location.pathname,
        search: buildQueryString({ ...search, ...nextAttrs }),
        scroll: false,
        replace,
      }),
    [router, location.pathname, search]
  );

  return [search, setSearch];
};

export default useSearch;
