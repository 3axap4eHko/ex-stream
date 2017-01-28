'use strict';

import {PassThrough} from 'stream';
import Request from '../src/Request';

const url = '/path/name?with=query';
const content = 'Test Content';

describe('Request Test Suite', () => {

  it('Should concat string and return object', done => {

    const rawRequest = new PassThrough();
    rawRequest.url = url;
    const stream = Request.request(rawRequest);
    stream.on('data', request => {
      request.url.path.should.be.equal(url);
      request.data.should.be.bufferOf(content);
      done();
    });

    rawRequest.end('Test Content');
  })
});