import {
  extendObservable
} from 'mobx';

export default class SnowStore {
  constructor() {
    extendObservable(this, {
      weather: null,
    })
  };
}