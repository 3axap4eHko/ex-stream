'use strict';

import Accumulator from './Accumulator';
import URI from 'uriil/URI';

const _request = Symbol('Request');
const _data = Symbol('Data');

class Request extends Accumulator {
  static request(request, dataTransform) {
    return new Request(request, dataTransform);
  }

  constructor(request) {
    super({objectMode: true});
    this[_request] = request;
    this[_data] = Buffer.from('');
    request.pipe(this)
  }

  _charge(data, enc, next) {
    this[_data] = Buffer.concat([this[_data], data]);
    next();
  }
  _release() {
    const protocol = this[_request].connection.encrypted ? 'https' : 'http';
    this[_request].uri = URI.parse(`${protocol}://${this[_request].headers.host}${this[_request].url}`);
    this[_request].data = this[_data];
    return this[_request];
  }
}

export default Request;