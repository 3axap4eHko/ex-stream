'use strict';

import Url from 'url';
import {Transform} from 'stream';
import Stringify from './Stringify';

const _request = Symbol('Request');


class Request extends Transform {
  static request(request) {
    return new Request(request);
  }

  constructor(request) {
    super({objectMode: true});
    this[_request] = request;

    request
      .pipe(Stringify.stringify())
      .pipe(this);

  }

  _transform(data, enc, next) {
    const request = {
      url: Url.parse(`http://localhost${this[_request].url}`),
      request: this[_request],
      data
    };
    next(null, request);
  }
}

export default Request;