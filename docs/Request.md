# Request

Puts request object as stream


- [`class Request`](#class-request)
  - [`constructor()`](#request-constructor-constructor)


- [`function request`](#function-request)
<a id="class-request"></a><h2>class Request</h2>
> Puts request object as stream

<h2>Constructor</h2>

``` javascript
constructor(request: IncomingMessage)
```
<a id="request-constructor-constructor"></a>

**Arguments:**

- `request`: `IncomingMessage`

**Example**:
  ``` javascript
  import { createServer } from 'http';
import { request } from 'ex-stream/Request';

createServer((req, res) => {
   request(req)
     .pipe(requestHandlerStream);
}).listen(3000, 'localhost');
  ```
---<a id="function-request"></a><h2>function request</h2>``` javascript
function request(request)
```
> Request stream factory function



**Arguments:**

- `request`: `IncomingMessage`

**Returns:** `Request`

