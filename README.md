# Ex-Stream

Tiny library of useful streams

[![build status](https://travis-ci.org/3axap4eHko/ex-stream.svg?branch=master)](https://travis-ci.org/3axap4eHko/ex-stream)

## Install
```bash
npm install ex-stream
```

## Contents
- [Accumulator](docs/Accumulator.md) - Accumulate stream data by charging and release it on stream finish
- [Composer](docs/Composer.md) - Compose streams into single stream
- [Concat](docs/Concat.md) - Concatenate stream data by `_concat` function
- [CSV](docs/Csvify.md) - Parse CSV stream text data to objects
- [Dispatcher](docs/Dispatcher.md) - Call executor with matched `inputData`
- [Filter](docs/Filter.md) - Filter stream data by filter callback
- [FilterRegexp](docs/FilterRegexp.md) - Filter stream data by RegExp
- [Jsonify](docs/Jsonify.md) - Converts stream text data to JSON object
- [Middleware](docs/Middleware.md) - Pass stream data to middleware list
- [Reducer](docs/Reducer.md) - Reduce stream data
- [Request](docs/Request.md) - Puts request object as stream
- [Splitter](docs/Splitter.md) - Splits stream data
- [Stringify](docs/Stringify.md) - Collects stream data and converts it to string
- [Throttle](docs/Throttle.md) - Throttles stream data
- [Wrapper](docs/Wrapper.md) - Wrap stream as stream data


## License
License [The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2016-present Ivan Zakharchenko