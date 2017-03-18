# Middleware

Pass stream data to middleware list


- [`class Middleware`](#class-middleware)
  - [`constructor()`](#middleware-constructor-constructor)


- [`function middleware`](#function-middleware)
<a id="class-middleware"></a><h2>class Middleware</h2>
> Pass stream data to middleware list

<h2>Constructor</h2>

``` javascript
constructor(middlewares: Array.<Function>)
```
<a id="middleware-constructor-constructor"></a>

**Arguments:**

- `middlewares`: `Array.<Function>`

**Example**:
  ``` javascript
  import { createServer } from 'http';
import { middleware } from 'ex-stream/Middleware';

const middlewares = [
   ({ req, res }, next) => {
     if (req.url === '/user') {
       res.end('USER');
     } else {
       next();
     }
   },
   ({ req, res }, next) => {
     if (req.url === '/messages') {
       res.end('MESSAGES');
     } else {
       next();
     }
   },
   ({ req, res }, next) => {
     next(new Error('Unknown request'));
   },
];

createServer((req, res) => {
   middleware(middlewares)
     .end({ req, res });
}).listen(3000, 'localhost');
  ```
---<a id="function-middleware"></a><h2>function middleware</h2>``` javascript
function middleware(middlewares)
```
> Middlewared stream factory function



**Arguments:**

- `middlewares`: `*`

**Returns:** `Middleware`

