# Accumulator

- [`class Accumulator`](#class-accumulator)
  - [`constructor()`](#accumulator-constructor-constructor)
  - [`_charge()`](#accumulator-method-_charge)
  - [`_release()`](#accumulator-method-_release)

<a id="class-accumulator"></a><h2>class Accumulator</h2>
``` javascript
import Accumulator from 'ex-stream/Accumulator';
```
> Accumulate stream data by charging and release it on stream finish



``` javascript
import Accumulator from 'ex-stream/Accumulator';
import { log } from 'ex-stream/LogStream';

class Concat extends Accumulator {
   data = '';
  _charge(data, enc, next) {
     this.data += data;
     next();
  }
  _release() {
     try {
       return this.data
     } catch(e) {
       this.data = '';
     }
  }
}
const concat = new Concat();
concat.pipe(log()); // 'abcdefg'

concat.write('a');
concat.write('b');
concat.write('c');
concat.write('d');
concat.write('e');
concat.write('f');
concat.end('g');
```



<h3>Constructor</h3>
<a id="accumulator-constructor-constructor"></a>


**Parameters:**

- `options`: `Object=` - Stream options



> Class is abstract


---

<h3>Methods</h3>

<a id="accumulator-method-_charge"></a>

``` javascript
_charge(data: *, encoding: String, next: Function)
```

> Charging stream

**Parameters:**

- `data`: `*` - charged data
- `encoding`: `String` - data encoding
- `next`: `Function` - pass function



---

<a id="accumulator-method-_release"></a>

``` javascript
_release()
```

> Release charged data

**Returns:** `*` - left data




