# CSV

Parse CSV stream text data to objects


- [`class CSV`](#class-csv)
  - [`constructor()`](#csv-constructor-constructor)


- [`function csv`](#function-csv)
<a id="class-csv"></a><h2>class CSV</h2>
> Parse CSV stream text data to objects

<h2>Constructor</h2>

``` javascript
constructor(escape: String, quote: String, delimiter: String, newLine: String, options: Object)
```
<a id="csv-constructor-constructor"></a>

**Arguments:**

- `escape`: `String`
- `quote`: `String`
- `delimiter`: `String`
- `newLine`: `String`
- `options`: `Object`

**Example**:
  ``` javascript
  import { createReadStream } from 'fs';
import { csv } from 'ex-stream/CSV';
import { log } from 'ex-stream/LogStream';

createReadStream('data.csv')
   .pipe(csv({ escape = '"', quote = '"', delimiter = ',', newLine = '\n' }))
   .pipe(log());

fileStream.pipe(csvStream);
  ```
---<a id="function-csv"></a><h2>function csv</h2>``` javascript
function csv(options)
```
> CSV Stream factory function



**Arguments:**

- `options`: `Object`

**Returns:** `CSV`

