'use strict';

import Filter from './Filter';

class FilterRegexp extends Filter {
  static filter(options) {
    return new FilterRegexp(options);
  }

  constructor({regexp, ...options}) {
    super({filter: value => regexp.test(value), ...options});
  }
}

export default FilterRegexp;