import { PassThrough } from 'stream';

const logTypes = {
  log: data => console.log(data),
  error: data => console.error(data),
};

/**
 * Logs stream data
 *
 * @module Log
 * @example
 * import { appendFileSync } from 'fs';
 * import { log } from 'ex-stream/Log';
 *
 * const logger = log();
 * logger.end('test'); // logs 'test' to stdout

 * const errorLogger = log();
 * errorLogger.write('test'); // logs 'test' to stderr
 *
 * const fileLogger = log({
 *    logger(data) {
 *      appendFileSync('filename.log', data);
 *    }
 * });
 * fileLogger.write('test'); // logs 'test' to file
 *
 */
export default class Log extends PassThrough {
  /**
   *
   * @param {Function} logger
   * @param {Object} options
   * @example <caption>Creates Log stream instance</caption>
   *  new Log({
   *    logger(data) {
   *      console.log(data);
   *    }
   *  })
   */
  constructor({logger, ...options}) {
    super({ objectMode: true, ...options });
    const logFunction = typeof logger === 'function' ? logger : (logger in logTypes ? logTypes[logger] : logTypes.log);
    this.on('data', logFunction);
  }
}
/**
 * Log stream factory function
 *
 * @param {Object} options
 * @returns {Log}
 */
export function log(options) {
  return new Log(options);
}
