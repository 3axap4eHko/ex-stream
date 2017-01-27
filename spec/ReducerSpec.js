'use strict';

import {PassThrough} from 'stream';
import Reducer from '../src/Reducer';

class TestStringStream extends Reducer {
  _reduce(result, chunk, encoding, next) {
    next(null, result + chunk);
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
});