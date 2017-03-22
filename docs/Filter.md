# Filter

- [`class Filter`](#class-filter)
  - [`constructor()`](#filter-constructor-constructor)
- [`function filter`](#function-filter)

<a id="class-filter"></a><h2>class Filter</h2>
``` javascript
import Filter from 'ex-stream/Filter';
```
> Filter stream data by filter callback



``` javascript
import { filter } from 'ex-stream/Filter';
import { log } from 'ex-stream/LogStream';

const filterStream = filter({
   filter(value) {
     return /test/.test(value);
   }
});

filterStream
 .pipe(log()); // 'any string'

filterStream.write('testing');
filterStream.write('untest');
filterStream.end('any string');
```



<h2>Constructor</h2>
<a id="filter-constructor-constructor"></a>


---

<a id="function-filter"></a><h2>function filter</h2>
``` javascript
import { filter } from '/Users/izakharc/projects/ex-stream/src/Filter';
```
> Filter stream factory function

``` javascript
function filter(options)
```

> Filter stream factory function

**Parameters:**

- `options`: `Object`

**Returns:** `Filter`

