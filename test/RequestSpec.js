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

  it('Should handle the request on empty content', done => {
    const url = '/path/name?with=query';
    testRequest({
      path: url,
      port: 8180,
      method: 'GET'
    })
      .then(({req, res}) => {
        Request
          .request(req)
          .on('data', request => {
            request.uri.path.should.be.equal(url);
            res.end('');
            done();
          });
      });
  });

  it('Should handle the request and return request object with buffer data on data event', done => {
    const url = '/path/name?with=query';
    const data = JSON.stringify({test: 1});

    testRequest({
      path: url,
      port: 8181,
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

  it('Should handle the request and return request object with buffer data by piping', done => {
    const url = '/path/name?with=query';
    const data = JSON.stringify({test: 1});

    testRequest({
      path: url,
      port: 8182,
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
          .pipe(new PassThrough({objectMode: true}))
          .on('data', request => {
            request.uri.path.should.be.equal(url);
            request.data.should.be.bufferOf(data);
            res.end('');
            done();
          });
      });
  });

  it('Should handle the request with data parser and return request object with parsed data on data event', done => {
    const url = '/path/name?with=query';
    const data = JSON.stringify({test: 1});
    const dataParser = rawData => JSON.parse(rawData);

    testRequest({
      path: url,
      port: 8183,
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

  it('Should handle the request with data parser and return request object with parsed data on pipe', done => {
    const url = '/path/name?with=query';
    const data = JSON.stringify({test: 1});
    const dataParser = rawData => JSON.parse(rawData);

    testRequest({
      path: url,
      port: 8184,
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
          .pipe(new PassThrough({objectMode: true}))
          .on('data', request => {
            request.uri.path.should.be.equal(url);
            JSON.stringify(request.data).should.be.equal(data);
            res.end('');
            done();
          });
      });
  });
});