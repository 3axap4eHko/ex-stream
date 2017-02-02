'use strict';

import Url from 'url';
import {Transform} from 'stream';

const _request = Symbol('Request');
const _content = Symbol('Content');

class Request extends Transform {
  static request(request, dataTransform) {
    return new Request(request, dataTransform);
  }

  constructor(request, dataParser) {
    super({objectMode: true});
    this[_request] = request;
    this[_content] = Buffer.from('');

    dataParser = dataParser || (data => data);

    request
      .on('data', data => this[_content] = Buffer.concat([this[_content], data]) )
      .on('end', () => this.end(dataParser(this[_content].toString())) );
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