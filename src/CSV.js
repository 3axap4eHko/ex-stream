import { Transform } from 'stream';
import Accumulator from './Accumulator';
import { split } from './Splitter';

/**
 * @private
 */
class RowParser extends Accumulator {
  static parse(options) {
    return new RowParser(options);
  }

  constructor({ escape, quote, delimiter, newLine }) {
    super({ objectMode: true });

    const escapedQuote = `${escape}${quote}`;

    this.newLine = newLine;
    this.escapedQuoteReplacer = ' '.repeat(escapedQuote.length);
    this.quote = quote;
    this.quoteExpr = new RegExp(quote, 'g');
    this.startQuoteExpr = new RegExp(`^${quote}`, 'g');
    this.delimiter = delimiter;
    this.delimiterExpr = new RegExp(delimiter, 'g');
    this.escapedQuoteExpr = new RegExp(escapedQuote, 'g');

    this.quouteCount = 0;
    this.row = [];
    this.cleanRow = [];
    this.id = 0;
  }

  _charge(row, enc, next) {
    const cleanRow = row.toString().replace(this.escapedQuoteExpr, this.escapedQuoteReplacer);
    if (this.quouteCount === 0 && cleanRow.trim().length === 0) {
      return next();
    }

    const quoteCount = (cleanRow.match(this.quoteExpr) || []).length;
    this.row.push(row);
    this.cleanRow.push(row);
    this.quouteCount += quoteCount;
    if (this.quouteCount % 2 === 0) {
      this.push(this._release());
    }
    next();
  }

  _release() {
    try {
      const cleanRowString = this.cleanRow.join(this.newLine);
      const rowString = this.row.join(this.newLine);
      const parts = cleanRowString.split(this.delimiterExpr);
      const records = [];
      const record = [];
      let quoteCount = 0;
      let lastIndex = 0;
      while (parts.length) {
        const part = parts.shift();
        record.push(part);
        quoteCount += (part.match(this.quoteExpr) || []).length;

        if (quoteCount % 2 === 0) {
          const cleanRecord = record.join(this.delimiter);
          const length = record.join(this.delimiter).length;
          const needClear = this.startQuoteExpr.test(cleanRecord) | 0;
          const value = rowString.slice(lastIndex + needClear, lastIndex + length - needClear);
          records.push(value);
          lastIndex += length + 1;
          record.splice(0);
        }
      }

      return { records, id: this.id++, row: rowString };
    } catch (e) {
      e.message = `${e.message} "${this.row.join(this.newLine)}"`;
      throw e;
    } finally {
      this.row = [];
      this.cleanRow = [];
      this.quouteCount = 0;
    }
  }
}

const _splitter = Symbol('splitter');
const _parser = Symbol('parser');
/**
 * Parse CSV stream text data to objects
 * @module CSV
 * @example
 * import { createReadStream } from 'fs';
 * import { csv } from 'ex-stream/CSV';
 * import { log } from 'ex-stream/LogStream';
 *
 * createReadStream('data.csv')
 *    .pipe(csv({ escape = '"', quote = '"', delimiter = ',', newLine = '\n' }))
 *    .pipe(log());
 *
 * fileStream.pipe(csvStream);
 */
export default class CSV extends Transform {
  /**
   *
   * @param {String} escape
   * @param {String} quote
   * @param {String} delimiter
   * @param {String} newLine
   * @param {Object} options
   * @example <caption>Basic usage</caption>
   *   new CSV({ escape = '"', quote = '"', delimiter = ',', newLine = '\n' });
   */
  constructor({ escape = '"', quote = '"', delimiter = ',', newLine = '\n', ...options } = {}) {
    super({ ...options, objectMode: true });
    this[_splitter] = split({
      splitter: newLine
    });
    this[_parser] = RowParser.parse({
      escape,
      quote,
      delimiter,
      newLine
    }).on('data', data => {
      this.push(data);
    });
    this[_splitter]
      .pipe(this[_parser]);
  }

  /**
   * @private
   */
  _transform(chunk, enc, next) {
    this[_splitter].write(chunk);
    next();
  }
}
/**
 * CSV Stream factory function
 * @param {Object} options
 * @returns {CSV}
 */
export function csv(options) {
  return new CSV(options);
}
