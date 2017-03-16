# Accumulator

Accumulate stream data by charging and release it on stream finish


- [`class Accumulator`](#class-accumulator)
  - [`constructor()`](#accumulator-constructor-constructor)
  - [`_charge()`](#accumulator-method-_charge)
  - [`_release()`](#accumulator-method-_release)




<a id="class-accumulator"></a><h2>Accumulator</h2>
> Accumulate stream data by charging and release it on stream finish


<a id="accumulator-constructor-constructor"></a>
```javascript
new Accumulator(options: Object)
```

---



<h2>Methods</h2>
<a id="accumulator-method-_charge"></a>
<h3>_charge(data: any, encoding: String, next: Function)</h3>

> Charging stream

**Arguments:**
  
- `data`: `any`
- `encoding`: `String`
- `next`: `Function`


---
<a id="accumulator-method-_release"></a>
<h3>_release()</h3>

> Release charged data


**Returns:** `*`

---




**Example**:
``` javascript
class MyStream extends Accumulator {
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
const accumulator = new MyStream();
accumulator.on('data', data => console.log(data)); // 'abcdefg'
accumulator.write('a');
accumulator.write('b');
accumulator.write('c');
accumulator.write('d');
accumulator.write('e');
accumulator.write('f');
accumulator.end('g');
```

