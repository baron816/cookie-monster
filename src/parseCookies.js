export default function parseCookies({
  delimiter,
  oldCookie = '',
  kvSeparator
}, appendingStr) {
  var newObj = cookiesToObject({delimiter, oldCookie, kvSeparator});

  var [prevKey, newVal] = splitCookieValue(appendingStr, kvSeparator);

  newObj[prevKey] = newVal;

  return stringify({delimiter, kvSeparator}, newObj);
}

export function removeCookieValue({
  delimiter,
  oldCookie = '',
  kvSeparator
}, strToRemove) {
  var newObj = cookiesToObject({delimiter, oldCookie, kvSeparator});

  delete newObj[strToRemove];

  return stringify({delimiter, kvSeparator}, newObj);
}

function cookiesToObject({
  delimiter,
  oldCookie = '',
  kvSeparator
}) {
  var splitStr = oldCookie.split(delimiter).filter(val => val);

  return splitStr.reduce(function(acc, curr) {
    var [key, val] = curr.split(kvSeparator);

    acc[key] = val;
    return acc;
  }, {});
}

export function splitCookieValue(cookieValueString, kvSeparator) {
  return cookieValueString.split(kvSeparator);
}

function stringify({delimiter, kvSeparator}, newObj) {
  var resArr = [];

  for (var key of Object.keys(newObj)) {
    resArr.push(key + kvSeparator + newObj[key])
  }

  return resArr.join(delimiter);
}
