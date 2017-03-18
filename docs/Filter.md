# Filter

Filter stream data by filter callback


- [`class Filter`](#class-filter)
  - [`constructor()`](#filter-constructor-constructor)


- [`function filter`](#function-filter)
<a id="class-filter"></a><h2>class Filter</h2>
> Filter stream data by filter callback

<h2>Constructor</h2>

``` javascript
constructor(filter: Function, options: Object)
```
<a id="filter-constructor-constructor"></a>

**Arguments:**

- `filter`: `Function`
- `options`: `Object`

**Example**:
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
---<a id="function-filter"></a><h2>function filter</h2>``` javascript
function filter(options)
```
> Filter stream factory function



**Arguments:**

- `options`: `Object`

**Returns:** `Filter`

