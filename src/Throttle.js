'use strict';

import Accumulator from './Accumulator';

const _throttle = Symbol('Data throttler');

class Throttle extends Accumulator {
    constructor(options) {
        super(options);
        if (typeof this._throttling !== 'function') {
            throw new Error('Method _throttling is not defined');
        }
    }
    _charge(data, enc, next) {
        if (typeof this[_throttle] === 'undefined') {
            this[_throttle] = data;
        } else {
            this[_throttle] += data;
        }
        if (!this._throttling(this[_throttle])) {
            this.push(this[_throttle]);
            delete this[_throttle];
        }
        next();
    }
}

export default Throttle;