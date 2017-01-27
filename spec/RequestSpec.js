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
      expect(request.url.path).toEqual(url);
      expect(request.data.toString()).toEqual(content);
      done();
    });

    rawRequest.end('Test Content');
  })
});