# FilterRegexp

- [`class FilterRegexp`](#class-filterregexp)
  - [`constructor()`](#filterregexp-constructor-constructor)
- [`function filter`](#function-filter)

<a id="class-filterregexp"></a><h2>class FilterRegexp</h2>
``` javascript
import FilterRegexp from 'ex-stream/FilterRegexp';
```
> Filter stream data by RegExp



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



<h3>Constructor</h3>
<a id="filterregexp-constructor-constructor"></a>


**Parameters:**

- `regexp`: `RegExp`
- `options`: `Object`



> Creates FilterRegexp stream instance


``` javascript
new FilterRegexp({
   regexp: /^\w+$/
 })
```


---

<a id="function-filter"></a><h2>function filter</h2>
``` javascript
import { filter } from 'ex-stream/FilterRegexp';
```
> FilterRegexp stream factory function

``` javascript
function filter(options)
```
