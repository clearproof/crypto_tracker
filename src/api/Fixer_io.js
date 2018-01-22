import axios from 'axios';
import Config from '../../config.json';

/**
 * Get data from Fixer.io
 * https://github.com/hakanensari/fixer/
 */
export default {
  // Get change from Fixer.io
  getLatestChange(callback,errorCallback){
    axios.get(Config.fixer_io.api_url.latest)
      .then((resp) => {
        console.log(resp.data);
        callback(resp.data.rates);
      })
      .catch((err) => {
        errorCallback(err);
      });
  },
}