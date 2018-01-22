
//https://github.com/izolate/millify/blob/master/index.js



const suffixes = new Map();
suffixes.set(3, 'K');
suffixes.set(6, 'M');
suffixes.set(9, 'B');
suffixes.set(12, 'T');


/**
 * Convert number currency to human readable currency
 * @param ugly the currency value to convert
 * @returns {string} the human readble currency
 */
export function currencyFilter (ugly) {
  let decimal = 3;
  ugly = Math.round(ugly*1000)/1000;
  const digits = Math.floor(Math.log10(Math.abs(ugly))) + 1;

  // Figure out the appropriate unit for the number
  const units = ((num, zeroes) => {
    for (let z of suffixes.keys()) if (num > z) zeroes = z;
    return { suffix: suffixes.get(zeroes), zeroes }
  })(digits, null)

  const pretty = ugly/Math.pow(10, units.zeroes);

  decimal = (pretty % 1 === 0) ? 2 : Math.max(1, (decimal + 1)) || 3;

  if (-1000 < ugly && ugly < 1000) return ugly;
  return  `${parseFloat(pretty.toPrecision(decimal))}${units.suffix}`;
}