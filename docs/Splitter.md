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



<h2>Constructor</h2>
<a id="splitter-constructor-constructor"></a>


---

<a id="function-split"></a><h2>function split</h2>
``` javascript
import { split } from 'src/Splitter';
```
``` javascript
function split()
```


