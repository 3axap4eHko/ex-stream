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



<h2>Constructor</h2>
<a id="stringify-constructor-constructor"></a>


---

<a id="function-stringify"></a><h2>function stringify</h2>
``` javascript
import { stringify } from '/Users/izakharc/projects/ex-stream/src/Stringify';
```
``` javascript
function stringify()
```


