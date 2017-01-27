'use strict';

import Accumulator from './Accumulator';

const _data = Symbol('data');
const _splitter = Symbol('splitter');

class Splitter extends Accumulator {
    [_data] = '';
    constructor({splitter = '\n', ...options} = {}) {
        super(options);
        this[_splitter] = splitter;
    }
    _charge(data, enc, next) {
        this[_data] += data.toString();
        let index;
        while( (index = this[_data].indexOf(this[_splitter])) >= 0 ){
            this.push(this[_data].slice(0, index));
            this[_data] = this[_data].slice(index);
        }
        next();
    }
    _release() {
        return this[_data];
    }
}

export default Splitter;