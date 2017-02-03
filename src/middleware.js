import {Transform} from 'stream';

export default function middleware(callback) {
  return new Transform({
    transform(chunk, encoding, next) {
      const result = callback(chunk, encoding, next);
      if (result instanceof Promise) {
        result
          .catch(error => next(error))
          .then(data => next(null, data));
      }
    }
  });
}