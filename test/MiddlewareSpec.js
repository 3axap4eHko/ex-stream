import { PassThrough } from 'stream';
import Middleware from '../src/Middleware';


describe('Middleware Test Suite', () => {

  it('Should passthrough the same value on no middlewares', done => {
    const testValue = { test: 1 };
    const mw = new Middleware([]);
    mw.on('data', data => {
      data.should.be.deepEqual(testValue);
      done()
    });
    mw.end(testValue);

  });
  it('Should passthrough the same value on no middlewares', done => {
    const testValue = { test: 1 };
    const mw = new Middleware([
      (value, next) => (value.test++,next()),
      (value, next) => (value.a=1,next()),
    ]);
    mw.on('data', data => {
      data.should.be.deepEqual(testValue);
      data.should.have.property('a', 1);
      done()
    });
    mw.end(testValue);

  });

});