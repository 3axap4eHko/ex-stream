'use strict';

import {PassThrough} from 'stream';
import Aggregator from '../src/Aggregator';

class TestStringStream extends Aggregator {
  _aggregate(result, chunk, encoding, next) {
    next(null, result + chunk);
  }
}


describe('Aggregator Test Suite', () => {

  it('Should aggregate values', (done) => {

    const testString = 'abcdefg';
    const aggregate = new TestStringStream();
    const stream = new PassThrough();
    let counter = 1;
    aggregate.pipe(stream);
    stream.on('data', data => {
      counter++;
      expect(data).toEqual(Buffer.from(testString.slice(0, counter)));
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