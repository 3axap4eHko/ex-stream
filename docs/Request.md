# Request

- [`class Request`](#class-request)
  - [`constructor()`](#request-constructor-constructor)
- [`function request`](#function-request)

<a id="class-request"></a><h2>class Request</h2>
``` javascript
import Request from 'ex-stream/Request';
```
> Puts request object as stream



``` javascript
import { createServer } from 'http';
import { request } from 'ex-stream/Request';

createServer((req, res) => {
   request(req)
     .pipe(requestHandlerStream);
}).listen(3000, 'localhost');
```



<h2>Constructor</h2>
<a id="request-constructor-constructor"></a>


---

<a id="function-request"></a><h2>function request</h2>
``` javascript
import { request } from 'ex-stream/Request';
```
> Request stream factory function

``` javascript
function request(request)
```
