import { readFileSync } from 'fs';
import { createServer, request as httpsRequest  } from 'https';
import { PassThrough } from 'stream';
import { request } from '../src/Request';

const key = readFileSync(__dirname + '/ssl/private.key', 'utf8');
const cert = readFileSync(__dirname + '/ssl/certificate.crt', 'utf8');

const serverOptions = { key, cert };
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function testRequest({ data, ...options }) {
  return new Promise(resolve => {
    createServer(serverOptions, (req, res) => resolve({ req, res }))
      .listen(options.port, () => httpsRequest(options).end(data));
  });
}

const testPath = '/path/name';
const testQuery = 'with=query';
const testUrl = `${testPath}?${testQuery}`;

describe('Request Test Suite', () => {

  it('Should handle the request on empty content', done => {
    testRequest({
      path: testUrl,
      port: 8180,
      method: 'GET'
    })
      .then(({ req, res }) => {
        request(req)
          .on('data', request => {
            request.uri.path.should.be.equal(testPath);
            res.end('');
            done();
          });
      }, done);
  });

  it('Should handle the request and return request object with buffer data on data event', done => {
    const url = '/path/name?with=query';
    const data = JSON.stringify({ test: 1 });

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
      .then(({ req, res }) => {
        request(req)
          .on('data', request => {
            request.uri.path.should.be.equal(testPath);
            request.rawData.should.be.bufferOf(data);
            res.end('');
            done();
          });
      }, done);
  });

  it('Should handle the request and return request object with buffer data by piping', done => {
    const url = '/path/name?with=query';
    const data = JSON.stringify({ test: 1 });

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
      .then(({ req, res }) => {
        request(req)
          .pipe(new PassThrough({ objectMode: true }))
          .on('data', request => {
            request.uri.path.should.be.equal(testPath);
            request.rawData.should.be.bufferOf(data);
            res.end('');
            done();
          });
      }, done);
  });
});