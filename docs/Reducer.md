# Reducer

- [`class Reducer`](#class-reducer)
  - [`constructor()`](#reducer-constructor-constructor)
  - [`_reduce()`](#reducer-method-_reduce)

<a id="class-reducer"></a><h2>class Reducer</h2>
``` javascript
import Reducer from 'ex-stream/Reducer';
```
> Reduce stream data



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



<h2>Constructor</h2>
<a id="reducer-constructor-constructor"></a>



##### Class is abstract


---

<h2>Methods</h2>
<a id="reducer-method-_reduce"></a>

``` javascript
_reduce(result: any, chunk: any, enc: String, next: Function)
```

> Reduce stream data


**Parameters:**

- `result`: `any`
- `chunk`: `any`
- `enc`: `String`
- `next`: `Function`





