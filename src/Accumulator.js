'use strict';

import {Transform, PassThrough} from 'stream';

const _accumulator = Symbol('Data accumulator');

class Accumulator extends Transform {
    static accumulate(options) {
        return new Accumulator(options);
    }
    constructor(options) {
        super(options);
        if (typeof this._charge !== 'function') {
            throw new Error('Method _charge is not defined');
        }
        if (typeof this._release !== 'function') {
            throw new Error('Method _release is not defined');
        }

        this[_accumulator] = new PassThrough(options);
        this.on('finish', () => this[_accumulator].end(this._release()) );
    }
    pipe(stream) {
        return this[_accumulator].pipe(stream);
    }
    unpipe(stream) {
        return this[_accumulator].unpipe(stream);
    }
    _transform(chunk, encoding, next) {
        this._charge(chunk, encoding, next);
    }

}

export default Accumulator;