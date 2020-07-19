import { v4 as uuid } from 'uuid';
import drinkOptions from '../data/drinkOptions.json';
import nextArrayIndex from '../functions/nextArrayIndex';

export default class Drink {
  constructor(options = { size: 0, tea: 0, milk: 0, topping: 0, ice: 0, sugar: 0 }) {
    this.id = uuid();
    this.options = options;
  }
  get price() {
    let price = 0;
    for (let optionName in this.options) {
      price += drinkOptions[optionName][this.options[optionName]].price;
    }
    return Number(price).toFixed(2);
  }
  cycleOption(optionName) {
    const optionsArray = drinkOptions[optionName];
    this.options[optionName] = nextArrayIndex(this.options[optionName], optionsArray);
  }
}
