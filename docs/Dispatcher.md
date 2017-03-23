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



<h3>Constructor</h3>
<a id="dispatcher-constructor-constructor"></a>


**Parameters:**

- `matcher`: `function (inputData: *)` - function matches `inputData` and returns `matchedData`
- `executor`: `function (matched: *)` - function executed with `matchedData` and returns value or `Promise` that passed to stream



> Creates Dispatcher stream instance


``` javascript
function matcher(inputData) {
   // ...
 }
 function executor(matchedData) {
   // ...
 }

 new Dispatcher(matcher, executor);
```


---

<a id="function-dispatch"></a><h2>function dispatch</h2>
``` javascript
import { dispatch } from 'ex-stream/Dispatcher';
```
``` javascript
function dispatch(matcher, executor)
```
