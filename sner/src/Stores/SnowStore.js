import {
  extendObservable
} from 'mobx';

export default class SnowStore {
  constructor() {
    extendObservable(this, {
      user: null,
      _id: null,
      weather: [],
      loaded: false,
    });
  };
};