import { PassThrough } from 'stream';

const logTypes = {
  log: data => console.log(data),
  error: data => console.error(data),
};

/**
 * Logs stream data
 *
 * @module LogStream
 * @example
 * import { appendFileSync } from 'fs';
 * import { log } from 'ex-stream/LogStream';
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
export default class LogStream extends PassThrough {
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
 * @returns {LogStream}
 */
export function log(options) {
  return new LogStream(options);
}
