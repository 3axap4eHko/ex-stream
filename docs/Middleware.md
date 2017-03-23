# Middleware

- [`class Middleware`](#class-middleware)
  - [`constructor()`](#middleware-constructor-constructor)
- [`function middleware`](#function-middleware)

<a id="class-middleware"></a><h2>class Middleware</h2>
``` javascript
import Middleware from 'ex-stream/Middleware';
```
> Pass stream data to middleware list



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



<h3>Constructor</h3>
<a id="middleware-constructor-constructor"></a>


**Parameters:**

- `middlewares`: `Array.<Function>` - list of middleware



> Creates Middleware stream instance


``` javascript
new Middleware(middlewareList);
```


---

<a id="function-middleware"></a><h2>function middleware</h2>
``` javascript
import { middleware } from 'ex-stream/Middleware';
```
> Middlewared stream factory function

``` javascript
function middleware(middlewares)
```
