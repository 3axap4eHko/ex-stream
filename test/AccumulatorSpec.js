import { PassThrough } from 'stream';
import Accumulator from '../src/Accumulator';

const _data = Symbol('data');

class TestConcatStringStream extends Accumulator {

  constructor(options) {
    super(options);
    this[_data] = '';
  }

  _charge(data, enc, next) {
    this[_data] += data;
    next();
  }

  _release() {
    return [this[_data], this[_data] = ''][0];
  }
}

class TestGroupStringStream extends Accumulator {
  [_data] = '';

  constructor(options) {
    super({ ...options, objectMode: true });
  }

  _charge(data, enc, next) {
    this[_data] += data;
    if (this[_data].length >= 2) {
      this.push(this._release());
    }
    next();
  }

  _release() {
    return [this[_data], this[_data] = ''][0];
  }
}


describe('Accumulator Test Suite', () => {

  it('Should accumulate values and emit them in event for join', (done) => {

    const testString = 'abcdefg';
    const accumulator = new TestConcatStringStream();
    let counter = 0;
    accumulator.on('data', data => {
      data.should.be.bufferOf(testString);
      counter++;
    });
    accumulator.on('finish', () => {
      counter.should.be.exactly(1);
      done();
    });
    accumulator.write('a');
    accumulator.write('b');
    accumulator.write('c');
    accumulator.write('d');
    accumulator.write('e');
    accumulator.write('f');
    accumulator.end('g');
  });

  it('Should do not emit empty values', (done) => {
    const accumulator = new TestConcatStringStream();
    let counter = 0;
    accumulator.on('data', () => counter++);
    accumulator.on('finish', () => {
      counter.should.be.exactly(0);
      done();
    });
    accumulator.end();
  });

  it('Should accumulate values and emit them in event for group', (done) => {

    const testString = 'abcdefg';
    const accumulator = new TestGroupStringStream();
    let counter = 0;
    accumulator.on('data', data => {
      data.should.be.bufferOf(testString.slice(counter * 2, counter * 2 + 2));
      counter++;
    });
    accumulator.on('finish', () => {
      counter.should.be.exactly(4);
      done();
    });
    accumulator.write('a');
    accumulator.write('b');
    accumulator.write('c');
    accumulator.write('d');
    accumulator.write('e');
    accumulator.write('f');
    accumulator.end('g');
  });

  it('Should accumulate values and pipe them to a stream', (done) => {

    const testString = 'abcdefg';
    const accumulator = new TestConcatStringStream();
    const stream = new PassThrough();
    accumulator.pipe(stream);
    stream.on('data', data => {
      data.should.be.bufferOf(testString);
      done();
    });
    accumulator.write('a');
    accumulator.write('b');
    accumulator.write('c');
    accumulator.write('d');
    accumulator.write('e');
    accumulator.write('f');
    accumulator.end('g');
  });

  it('Should accumulate values and allows read them', (done) => {

    const testString = 'abcdefg';
    const accumulator = new TestConcatStringStream();
    accumulator.on('readable', () => {
      accumulator.read().should.be.bufferOf(testString);
      done();
    });
    accumulator.write('a');
    accumulator.write('b');
    accumulator.write('c');
    accumulator.write('d');
    accumulator.write('e');
    accumulator.write('f');
    accumulator.end('g');
  });

  it('Should allow read empty values', (done) => {

    const accumulator = new TestConcatStringStream();
    accumulator.on('readable', () => {
      ({null: null}).should.have.property('null', accumulator.read());
      done();
    });
    accumulator.end();
  });

});