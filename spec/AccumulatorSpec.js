'use strict';

import {PassThrough} from 'stream';
import Accumulator from '../src/Accumulator';

const _data = Symbol('data');

class TestStringStream extends Accumulator {
    [_data] = '';
    constructor(options) {
        super(options);
    }
    _charge(data, enc, next) {
        this[_data] += data;
        next();
    }
    _release() {
        return this[_data];
    }
}


describe('Accumulator Test Suite', () => {

    it('Should accumulate values', (done) => {

        const testString = 'abcdefg';
        const aggregate = new TestStringStream();
        const stream = new PassThrough();
        let counter = 1;
        aggregate.pipe(stream);
        stream.on('data', data => {
            counter++;
            expect(data).toEqual(Buffer.from(testString));
            done();
        });
        aggregate.write('a');
        aggregate.write('b');
        aggregate.write('c');
        aggregate.write('d');
        aggregate.write('e');
        aggregate.write('f');
        aggregate.end('g');
    });

});