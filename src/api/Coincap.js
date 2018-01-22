import axios from 'axios';
import Config from '../../config.json';

// Add rank to coins
Array.prototype.addRank = function () {
    for(let e in this){
      this[e].rank = parseInt(e) + 1;
    }
  return this;
};
// Add font class
// https://github.com/allienworks/cryptocoins/blob/master/webfont/cryptocoins-colors.css
Array.prototype.addFontClass = function () {
  // TODO add font
  let badFont = {
    BCH: 'BCC',
    IOT: 'IOTA',
    LSK: 'LISK',

  };
  for(let e in this){
    let short = this[e].short;
    if(badFont[short] === undefined){
      this[e].fontClass = short;
    }else{
      this[e].fontClass = badFont[short];
    }

  }
  return this;
};

// Add line color
/*Array.prototype.addColor = function () {
  for(let e in this){
    if(this[e].perc > 0){
      this[e]._rowVariant =
    }else{
      this[e]._rowVariant
    }
  }
  return this;
};
*/

/**
 * Get data from Coincap API
 */
export default {
  // Get coins from Coincap
  getCoins(callback,errorCallback){
    axios.get(Config.coincap.api_url.front)
      .then((resp) => {
        callback(resp.data.sort(this.sort_by('mktcap', true, parseInt)).addRank().addFontClass()); //.slice(0, 50).
      })
      .catch((err) => {
        errorCallback(err);
      });
  },
  // Get global info (global bar) from Coincap
  getGlobal(callback,errorCallback){
    axios.get(Config.coincap.api_url.global)
      .then((resp) => {
        callback(resp.data);
      })
      .catch((err) => {
        errorCallback(err);
      });
  },
  // Get Chart data from Coincap
  // TODO to complete
  getChartData(days, short) {
    axios.get(`${Config.coincap.api_url.history}${days}/${short}`)
      .then((resp) => {
        console.log(resp.data);
        this.state.chartData = resp.data;
        this.state.fetchedChartData = true;
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
  sort_by(field, reverse, primer) {
    const key = primer ?
      function (x) { return primer(x[field]); } :
      function (x) { return x[field]; };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    };
  }
}
