'use strict';

import Filter from './Filter';

const _regexp = Symbol('regexp');

class FilterRegexp extends Filter {
  static filter(options) {
    return new FilterRegexp(options);
  }
  constructor({regexp, ...options}) {
    super(options);
    this[_regexp] = new RegExp(regexp);
  }
  _filter(data) {
    return this[_regexp].test(data);
  }
}

export default FilterRegexp;