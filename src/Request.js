import Accumulator from './Accumulator';
import URI from 'uriil/URI';

const _request = Symbol('Request');
const _data = Symbol('Data');

/**
 * Puts request object as stream
 * @module Request
 * @example
 * import { createServer } from 'http';
 * import { request } from 'ex-stream/Request';
 *
 * createServer((req, res) => {
 *    request(req)
 *      .pipe(requestHandlerStream);
 * }).listen(3000, 'localhost');
 */
export default class Request extends Accumulator {
  /**
   *
   * @param {IncomingMessage} request - request object
   * @example <caption>Creates Request stream instance</caption>
   *  new Request(request);
   */
  constructor(request) {
    super({ objectMode: true });
    this[_request] = request;
    this[_data] = Buffer.from('');
    request.pipe(this);
  }

  /**
   * @private
   */
  _charge(data, enc, next) {
    this[_data] = Buffer.concat([this[_data], data]);
    next();
  }

  /**
   * @private
   */
  _release() {
    const protocol = this[_request].connection.encrypted ? 'https' : 'http';
    this[_request].uri = URI.parse(`${protocol}://${this[_request].headers.host}${this[_request].url}`);
    this[_request].rawData = this[_data];
    return this[_request];
  }
}
/**
 * Request stream factory function
 * @param {IncomingMessage} request
 * @returns {Request}
 */
export function request(request) {
  return new Request(request);
}
