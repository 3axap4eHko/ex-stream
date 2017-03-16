import Filter from './Filter';
/**
 * Filter stream data by RegExp
 * @module FilterRegexp
 */
export default class FilterRegexp extends Filter {
  constructor({regexp, ...options}) {
    super({filter: value => regexp.test(value), ...options});
  }
}

export function filter(options) {
  return new FilterRegexp(options);
}
