'use strict';

import Stringify from './Stringify';

class Jsonify extends Stringify {
  _release() {
    return JSON.parse(super._release());
  }
}

export default Jsonify;