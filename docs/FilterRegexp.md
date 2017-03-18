# FilterRegexp

Filter stream data by RegExp


- [`class FilterRegexp`](#class-filterregexp)
  - [`constructor()`](#filterregexp-constructor-constructor)


- [`function filter`](#function-filter)
<a id="class-filterregexp"></a><h2>class FilterRegexp</h2>
> Filter stream data by RegExp

<h2>Constructor</h2>

``` javascript
constructor()
```
<a id="filterregexp-constructor-constructor"></a>

**Example**:
  ``` javascript
  import { filter } from 'ex-stream/FilterRegexp';
import { log } from 'ex-stream/LogStream';

const filterStream = filter({
   regexp: /test/
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
> FilterRegexp stream factory function



**Arguments:**

- `options`: `*`

**Returns:** `FilterRegexp`

