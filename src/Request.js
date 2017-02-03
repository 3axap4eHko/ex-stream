'use strict';

import {Transform} from 'stream';
import URI from 'uriil/URI';

const _request = Symbol('Request');
const _content = Symbol('Content');

class Request extends Transform {
  static request(request, dataTransform) {
    return new Request(request, dataTransform);
  }

  constructor(request) {
    super({objectMode: true});
    this[_request] = request;
    this[_content] = Buffer.from('');
    request
      .on('data', data => this[_content] = Buffer.concat([this[_content], data]) )
      .on('end', () => this.end(this[_content]) );
  }

  _transform(data, enc, next) {
    const protocol = this[_request].connection.encrypted ? 'https' : 'http';
    this[_request].uri = URI.parse(`${protocol}://${this[_request].headers.host}${this[_request].url}`);
    this[_request].data = data;

    next(null, this[_request]);
  }
}

export default Request;