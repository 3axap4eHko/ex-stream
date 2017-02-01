'use strict';

import {createServer, request} from 'http';
import {PassThrough} from 'stream';
import Request from '../src/Request';

function testRequest({data, ...options}) {
  return new Promise(resolve => {
    createServer((req, res) => resolve({req, res}))
      .listen(options.port, () => request(options).end(data));
  });
}

describe('Request Test Suite', () => {

  it('Should handle the request and return request object with buffer data', done => {
    const url = '/path/name?with=query';
    const data = JSON.stringify({test: 1});

    testRequest({
      path: url,
      port: 8189,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    })
      .then(({req, res}) => {
        Request
          .request(req)
          .on('data', request => {
            request.uri.path.should.be.equal(url);
            request.data.should.be.bufferOf(data);
            res.end('');
            done();
          });
      });
  });

  it('Should handle the request with data parser and return request object with parsed data', done => {
    const url = '/path/name?with=query';
    const data = JSON.stringify({test: 1});
    const dataParser = rawData => JSON.parse(rawData);

    testRequest({
      path: url,
      port: 8187,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    })
      .then(({req, res}) => {
        Request
          .request(req, dataParser)
          .on('data', request => {
            request.uri.path.should.be.equal(url);
            JSON.stringify(request.data).should.be.equal(data);
            res.end('');
            done();
          });
      });
  });

});