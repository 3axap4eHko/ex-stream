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



<h3>Constructor</h3>
<a id="filter-constructor-constructor"></a>


**Parameters:**

- `filter`: `Function` - function that returns bool
- `options`: `Object` - Stream options



> Creates Filter stream instance


``` javascript
new Filter({
   filter(data) {
     // ...
   }
 })
```


---

<a id="function-filter"></a><h2>function filter</h2>
``` javascript
import { filter } from 'ex-stream/Filter';
```
> Filter stream factory function

``` javascript
function filter(options)
```
