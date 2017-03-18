# Splitter

Splits stream data


- [`class Splitter`](#class-splitter)
  - [`constructor()`](#splitter-constructor-constructor)


- [`function split`](#function-split)
<a id="class-splitter"></a><h2>class Splitter</h2>
> Splits stream data

<h2>Constructor</h2>

``` javascript
constructor(splitter: String, includingMode: Number, options: Object)
```
<a id="splitter-constructor-constructor"></a>

**Arguments:**

- `splitter`: `String`
- `includingMode`: `Number`
- `options`: `Object`

**Example**:
  ``` javascript
  import { createReadStream } from 'fs';
import { split } from 'ex-stream/Splitter';
import { log } from 'ex-stream/LogStream';

createReadStream('filename')
   .pipe(split({ splitter: '\n' }))
   .pipe(log()); // display file content line by line
  ```
---<a id="function-split"></a><h2>function split</h2>``` javascript
function split()
```



