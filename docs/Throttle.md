# Throttle

- [`class Throttle`](#class-throttle)
  - [`constructor()`](#throttle-constructor-constructor)
  - [`_throttling()`](#throttle-method-_throttling)

<a id="class-throttle"></a><h2>class Throttle</h2>
``` javascript
import Throttle from 'ex-stream/Throttle';
```
> Throttles stream data



``` javascript
import Throttle from 'ex-stream/Throttle';

 class DelayThrottle extends Throttle {
   _throttling(data, next) {
     setTimeout(1000, next);
   }
 }
```



<h3>Constructor</h3>
<a id="throttle-constructor-constructor"></a>


**Parameters:**

- `options`: `*`



> Class is abstract


---

<h3>Methods</h3>

<a id="throttle-method-_throttling"></a>

``` javascript
_throttling(data: any)
```

> Throttle stream data

**Parameters:**

- `data`: `any`





