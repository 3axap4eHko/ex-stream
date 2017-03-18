# Reducer

Reduce stream data


- [`class Reducer`](#class-reducer)
  - [`constructor()`](#reducer-constructor-constructor)
  - [`_reduce()`](#reducer-method-_reduce)


<a id="class-reducer"></a><h2>class Reducer</h2>
> Reduce stream data

<h2>Constructor</h2>

``` javascript
constructor(init: any, options: Object)
```
<a id="reducer-constructor-constructor"></a>

**Arguments:**

- `init`: `any`
- `options`: `Object`


---
<h2>Methods</h2>
<a id="reducer-method-_reduce"></a>

``` javascript
_reduce(result: any, chunk: any, enc: String, next: Function)
```

> Reduce stream data


**Arguments:**

- `result`: `any`
- `chunk`: `any`
- `enc`: `String`
- `next`: `Function`


**Example**:
  ``` javascript
  import Reducer from 'ex-stream/Reducer';
import { log } from 'ex-stream/LogStream';

class SumStream extends from Reducer {
   constructor() {
     super({ init: 0 });
   }
   _reduce(result, value, enc, next) {
     next(null, result + parseInt(value));
   }
}

const sumStream = new SumStream();
sumStream.pipe(log()); // 5

sumStream.write(1);
sumStream.write(1);
sumStream.write(1);
sumStream.write(1);
sumStream.end(1);
  ```

