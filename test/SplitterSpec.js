'use strict';

import {PassThrough} from 'stream';
import Splitter from '../src/Splitter';


const testCase1 = `a,b,c,d,e
a,b,c,d,e`;

describe('Splitter Test Suite', () => {
  it('Splitter should emit event with spitted data', done => {
    const splitter = new Splitter({splitter: '\n'});
    const splitted = testCase1.split('\n');
    let counter = 0;
    splitter.on('data', data => {
      data.should.be.bufferOf(splitted[counter]);
      counter++;
    });
    splitter.on('end', () => {
      counter.should.be.exactly(splitted.length);
      done();
    });
    splitter.end(testCase1)
  });
});