'use strict';

import {PassThrough} from 'stream';
import Splitter from '../src/Splitter';
import Reducer from '../src/Reducer';

class TestStringStream extends Reducer {
  _reduce(result, chunk, encoding, next) {
    next(null, result + chunk);
  }
}

class Sum extends Reducer {
  constructor() {
    super({init: 0, objectMode: true});
  }
  _reduce(sum, value, enc, cb) {
    cb(null, sum + parseFloat(value));
  }
}

describe('Reducer Test Suite', () => {

  it('Should reduce values', (done) => {
    const reducer = new TestStringStream();
    const stream = new PassThrough();
    reducer.pipe(stream);
    stream.on('data', data => {
      expect(data).toEqual(Buffer.from('abcde'));
      done();
    });
    reducer.write('a');
    reducer.write('b');
    reducer.write('c');
    reducer.write('d');
    reducer.end('e');
  });

  it('Should reduce values 2', (done) => {


    const values = Array.from({length: 10}).map(() => Math.random() * 20);
    const sumValue = values.reduce( (result, value) => result + value);
    const testCase1 = values.join('\n     ');


    const splitter = Splitter.split('\n');
    const sum = new Sum();
    sum.on('data', value => {
      expect(value).toEqual(sumValue);
    });
    sum.on('end', () => {
      done();
    });
    splitter.pipe(sum);
    splitter.end(testCase1);
  });
});