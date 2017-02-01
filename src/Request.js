'use strict';

import Url from 'url';
import {Transform} from 'stream';
import Stringify from './Stringify';

const _request = Symbol('Request');

class Request extends Transform {
  static request(request, dataTransform) {
    return new Request(request, dataTransform);
  }

  constructor(request, dataParser) {
    super({objectMode: true});
    this[_request] = request;

    dataParser = dataParser || (data => data);

    request
      .pipe(Stringify.stringify())
      .on('data', data => this.end(dataParser(data.toString())));
  }

  _transform(data, enc, next) {
    const uri = Url.parse(`http://${this[_request].headers.host}${this[_request].url}`);
    Object.assign(this[_request], {
      data,
      uri
    });

    next(null, this[_request]);
  }
}

export default Request;