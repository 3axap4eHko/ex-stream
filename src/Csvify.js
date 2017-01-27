'use strict';

import Splitter from './Splitter';

const _data = Symbol('data');
const _options = Symbol('options');

class Csv extends Splitter {
    [_data] = '';

    constructor({escape = '"', quote ='"', delimiter = ',', newLine = '\r\n', ...options} = {}) {
        super({...options, splitter: newLine});
        this[_options] = {
            escape,
            quote,
            delimiter,
            newLine
        };
    }
    _charge(data, enc, next) {
        next();
    }
    _release() {
        return JSON.parse(super._release());
    }
}

export default Csv;