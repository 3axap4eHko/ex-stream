# CSV

- [`class CSV`](#class-csv)
  - [`constructor()`](#csv-constructor-constructor)
- [`function csv`](#function-csv)

<a id="class-csv"></a><h2>class CSV</h2>
``` javascript
import CSV from 'ex-stream/CSV';
```
> Parse CSV stream text data to objects



``` javascript
import { createReadStream } from 'fs';
import { csv } from 'ex-stream/CSV';
import { log } from 'ex-stream/LogStream';

createReadStream('data.csv')
   .pipe(csv({ escape = '"', quote = '"', delimiter = ',', newLine = '\n' }))
   .pipe(log());

fileStream.pipe(csvStream);
```



<h2>Constructor</h2>
<a id="csv-constructor-constructor"></a>


---

<a id="function-csv"></a><h2>function csv</h2>
``` javascript
import { csv } from '/Users/izakharc/projects/ex-stream/src/CSV';
```
> CSV Stream factory function

``` javascript
function csv(options)
```

> CSV Stream factory function

**Parameters:**

- `options`: `Object`

**Returns:** `CSV`

