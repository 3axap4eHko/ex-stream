# Ex-Stream

Tiny library of useful streams

[![build status](https://travis-ci.org/3axap4eHko/ex-stream.svg?branch=master)](https://travis-ci.org/3axap4eHko/ex-stream)

## Reference

 - Accumulator - accumulative stream
 ``` javascript
 // concat stream data
 class ConcatStringStream extends Accumulator {
   constructor(options) {
     super(options);
     this.string = '';
   }

   _charge(data, enc, next) {
     this.string += data;
     next();
   }

   _release() {
     try {
       return this.string;
     } finally {
       this.string = '';
     }
   }
 }
 ```
 - Splitter - splitting stream
 ``` javascript
 // display line by line
 fs
     .createReadStream('myFile.txt', 'utf8')
     .pipe(Splitter.split('\n'))
     .pipe(process.stdin)
 ```
 - Reducer - reducing stream like Array.reduce but for stream

 myFile.txt
 ``` text
    9.9
    18.15
    1
    0
    -7
    100.500
 ```

 ``` javascript
 class Sum extends Reducer {
    constructor() {
        super({init: 0})
    }
    _reduce(sum, value, enc, cb) {
        cb(sum + parseFloat(value));
    }
 }
  fs
      .createReadStream('myFile.txt', 'utf8')
      .pipe(Splitter.split('\n'))
      .pipe(new Sum())
      .pipe(process.stdin);
  // 122.55
 ```
## License

The MIT License Copyright (c) 2017-present Ivan Zakharchenko
