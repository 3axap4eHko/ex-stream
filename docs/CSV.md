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



<h3>Constructor</h3>
<a id="csv-constructor-constructor"></a>


**Parameters:**

- `options.escape`: `String=` - Escape string
- `options.quote`: `String` - Quote string
- `options.delimiter`: `String` - Delimiter string
- `options.newLine`: `String` - new line string
- `options`: `Object` - Stream options



> Creates CSV stream instance


``` javascript
new CSV({ escape = '"', quote = '"', delimiter = ',', newLine = '\n' });
```


---

<a id="function-csv"></a><h2>function csv</h2>
``` javascript
import { csv } from 'ex-stream/CSV';
```
> CSV Stream factory function

``` javascript
function csv(options)
```
