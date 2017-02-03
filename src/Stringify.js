'use strict';

import Concat from './Concat';

class Stringify extends Concat {
  static stringify(options) {
    return new Stringify(options);
  }

  constructor(options) {
    super({...options, init: ''});
  }

  _concat(result, chunk) {
    return result + chunk.toString();
  }
}

export default Stringify;