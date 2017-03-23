# Splitter

- [`class Splitter`](#class-splitter)
  - [`constructor()`](#splitter-constructor-constructor)
- [`function split`](#function-split)

<a id="class-splitter"></a><h2>class Splitter</h2>
``` javascript
import Splitter from 'ex-stream/Splitter';
```
> Splits stream data



``` javascript
import { createReadStream } from 'fs';
import { split } from 'ex-stream/Splitter';
import { log } from 'ex-stream/LogStream';

createReadStream('filename')
   .pipe(split({ splitter: '\n' }))
   .pipe(log()); // display file content line by line
```



<h3>Constructor</h3>
<a id="splitter-constructor-constructor"></a>


**Parameters:**

- `options.splitter`: `String` - splitting string
- `options.includingMode`: `Number` - including splitting string to result
- `options`: `Object` - Stream options



> Creates Splitter stream instance


``` javascript
new Splitter({ splitter: '|'})
```


---

<a id="function-split"></a><h2>function split</h2>
``` javascript
import { split } from 'ex-stream/Splitter';
```
> Splitter factory function

``` javascript
function split(options)
```
