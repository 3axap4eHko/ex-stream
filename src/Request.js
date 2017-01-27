'use strict';

import Url from 'url';
import {Readable} from 'stream';
import {concat} from './Concat';

const _request = Symbol('Request');


class Request extends Readable {
  static request(request) {
    return new Request(request);
  }
  constructor(request) {
    super({objectMode: true});
    this[_request] = request;

    request
      .pipe(concat)
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