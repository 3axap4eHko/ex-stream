'use strict';

import Accumulator from './Accumulator';

const _data = Symbol('data');
const _splitter = Symbol('splitter');
const _shift = Symbol('including splitter to result');

class Splitter extends Accumulator {
  static split(options) {
    return new Splitter(options);
  }

  constructor({splitter = '\n', includingMode, ...options} = {}) {
    super(options);
    this[_splitter] = splitter;
    this[_shift] = includingMode|0;
    this[_data] = '';
  }

  _charge(data, enc, next) {
    this[_data] += data.toString();
    let index;
    while ((index = this[_data].indexOf(this[_splitter])) >= 0) {
      const splitted = this[_data].slice(0, index + this[_shift]);
      this.push(splitted);
      this[_data] = this[_data].slice(index + 1);
    }
    next();
  }

  _release() {
    return this[_data];
  }
}

export default Splitter;