# Dispatcher

Call executor with matched `inputData`


- [`class Dispatcher`](#class-dispatcher)
  - [`constructor()`](#dispatcher-constructor-constructor)


- [`function dispatch`](#function-dispatch)
<a id="class-dispatcher"></a><h2>class Dispatcher</h2>
> Call executor with matched `inputData`

<h2>Constructor</h2>

``` javascript
constructor(matcher: Function, executor: Function)
```
<a id="dispatcher-constructor-constructor"></a>

**Arguments:**

- `matcher`: `Function`
- `executor`: `Function`

**Example**:
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
---<a id="function-dispatch"></a><h2>function dispatch</h2>``` javascript
function dispatch()
```



