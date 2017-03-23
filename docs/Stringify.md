# Stringify

- [`class Stringify`](#class-stringify)
  - [`constructor()`](#stringify-constructor-constructor)
- [`function stringify`](#function-stringify)

<a id="class-stringify"></a><h2>class Stringify</h2>
``` javascript
import Stringify from 'ex-stream/Stringify';
```
> Collects stream data and converts it to string



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



<h3>Constructor</h3>
<a id="stringify-constructor-constructor"></a>


**Parameters:**

- `options`: `Object` - Stream options



> Creates Stringify stream instance


``` javascript
new Stringify();
```


---

<a id="function-stringify"></a><h2>function stringify</h2>
``` javascript
import { stringify } from 'ex-stream/Stringify';
```
> Stringify factory function

``` javascript
function stringify(options)
```
