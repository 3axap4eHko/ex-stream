'use strict';

import Concat from './Concat';

class ToString extends Concat {
    static stringify(options) {
        return ToString(options);
    }
    _concat(result = '', chunk) {
        return result + chunk.toString();
    }
}

export default ToString;