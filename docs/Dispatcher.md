# Dispatcher

- [`class Dispatcher`](#class-dispatcher)
  - [`constructor()`](#dispatcher-constructor-constructor)
- [`function dispatch`](#function-dispatch)

<a id="class-dispatcher"></a><h2>class Dispatcher</h2>
``` javascript
import Dispatcher from 'ex-stream/Dispatcher';
```
> Call executor with matched `inputData`



``` javascript
import { createServer } from 'http';
import { dispatch } from 'ex-stream/Dispatcher';

const matcher = req => requestParser(req);
const executor = params => JSON.stringify(params);

createServer((req, res) => {
   dispatch(matcher, executor)
     .on(res)
}).listen(3000, 'localhost');
```



<h2>Constructor</h2>
<a id="dispatcher-constructor-constructor"></a>


---

<a id="function-dispatch"></a><h2>function dispatch</h2>
``` javascript
import { dispatch } from 'ex-stream/Dispatcher';
```
``` javascript
function dispatch()
```
