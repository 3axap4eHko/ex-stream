'use strict';

import Accumulator from './Accumulator';

const _result = Symbol('Reducer result');

class Reducer extends Accumulator {
    constructor(options) {
        super(options);
        if (typeof this._reduce !== 'function') {
            throw new Error('Method _reduce is not defined');
        }
    }

    _release() {
        try {
            return this[_result];
        } finally {
            delete this[_result];
        }
    }

    _charge(chunk, encoding, next) {
        if (typeof this[_result] === 'undefined') {
            this[_result] = chunk;
            next();
        } else {
            this._reduce(this[_result], chunk, encoding, (error, result) => {
                this[_result] = result;
                next(error);
            });
        }
    }
}

export default Reducer;