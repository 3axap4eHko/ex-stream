# Concat

- [`class Concat`](#class-concat)
  - [`constructor()`](#concat-constructor-constructor)
  - [`_concat()`](#concat-method-_concat)

<a id="class-concat"></a><h2>class Concat</h2>
``` javascript
import Concat from 'ex-stream/Concat';
```
> Concatenate stream data by `_concat` function



``` javascript
import Concat from 'ex-stream/Concat';
import { log } from 'ex-stream/LogStream';

class ConcatArray extends Concat {
 constructor(options) {
   super({init: [], options});
 }
 _concat(result, chunk, enc) {
   return result.concat([chunk]);
 }
}

const concatArray = new ConcatArray();
concatArray.pipe(log()); // [1,2,3,4,5]
concatArray.write(1);
concatArray.write(2);
concatArray.write(3);
concatArray.write(4);
concatArray.end(5);

class ConcatString extends Concat {
 constructor(options) {
   super({init: '', options});
 }
 _concat(result, chunk, enc) {
   return result + chunk;
 }
}

const concatString = new ConcatString();
concatString.pipe(log()); // 'abcde'
concatString.write('a');
concatString.write('b');
concatString.write('c');
concatString.write('d');
concatString.end('e');
```



<h3>Constructor</h3>
<a id="concat-constructor-constructor"></a>


**Parameters:**

- `options`: `Object` - Stream options



> Class is abstract


---

<h3>Methods</h3>

<a id="concat-method-_concat"></a>

``` javascript
_concat(result: *, data: *, enc: String)
```

> Stream data concatenation method

**Parameters:**

- `result`: `*` - result of concatenation
- `data`: `*` - data for concatenation
- `enc`: `String` - data encoding for concatenation

**Returns:** `*` - result of concatenation




