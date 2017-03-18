# Stringify

Collects stream data and converts it to string


- [`class Stringify`](#class-stringify)
  - [`constructor()`](#stringify-constructor-constructor)


- [`function stringify`](#function-stringify)
<a id="class-stringify"></a><h2>class Stringify</h2>
> Collects stream data and converts it to string

<h2>Constructor</h2>

``` javascript
constructor(options: Object)
```
<a id="stringify-constructor-constructor"></a>

**Arguments:**

- `options`: `Object`

**Example**:
  ``` javascript
  import { stringify } from 'ex-stream/Stringify';
import { log } from 'ex-stream/LogStream';

const inputStream = stringify();
inputStream.pipe(log()); // 'abcde'

inputStream.write('a');
inputStream.write('b');
inputStream.write('c');
inputStream.write('d');
inputStream.end('e');
  ```
---<a id="function-stringify"></a><h2>function stringify</h2>``` javascript
function stringify()
```



