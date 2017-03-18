# Accumulator

Accumulate stream data by charging and release it on stream finish


- [`class Accumulator`](#class-accumulator)
  - [`constructor()`](#accumulator-constructor-constructor)
  - [`_charge()`](#accumulator-method-_charge)
  - [`_release()`](#accumulator-method-_release)


<a id="class-accumulator"></a><h2>class Accumulator</h2>
> Accumulate stream data by charging and release it on stream finish

<h2>Constructor</h2>

``` javascript
constructor(options: Object)
```
<a id="accumulator-constructor-constructor"></a>

**Arguments:**

- `options`: `Object` - Stream options


---
<h2>Methods</h2>
<a id="accumulator-method-_charge"></a>

``` javascript
_charge(data: any, encoding: String, next: Function)
```

> Charging stream


**Arguments:**

- `data`: `any`
- `encoding`: `String`
- `next`: `Function`

---
<a id="accumulator-method-_release"></a>

``` javascript
_release()
```

> Release charged data


**Returns:** `*`

**Example**:
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

