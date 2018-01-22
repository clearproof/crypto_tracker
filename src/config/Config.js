import ConfigFile from '../../config.json';

const Config = {
  state: ConfigFile,
  setCurrencyAction(currency){
    this.state.currency = currency;
  },
  getCurrencyAction(currency){
    return this.state.currency
  }

};

export default Config;