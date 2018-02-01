import {
  extendObservable
} from 'mobx';
var axios = require('axios');

export default class SnowStore {
  constructor() {
    extendObservable(this, {
      weather: null,
      locationArray: [],
    })
  };
}