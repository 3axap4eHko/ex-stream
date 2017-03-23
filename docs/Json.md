# Jsonify

- [`class Json`](#class-json)
  - [`constructor()`](#json-constructor-constructor)
- [`function json`](#function-json)

<a id="class-json"></a><h2>class Json</h2>
``` javascript
import Jsonify from 'ex-stream/Json';
```
> Converts stream text data to JSON object



``` javascript
import { createServer } from 'http';
import { json } from 'ex-stream/Json';

createServer((req, res) => {
   req
     .pipe(json())
     .pipe(res);
}).listen(3000, 'localhost');
```



<h3>Constructor</h3>
<a id="json-constructor-constructor"></a>


**Parameters:**

- `options`: `Object` - Stream options



> Creates Json stream instance


``` javascript
new Json()
```


---

<a id="function-json"></a><h2>function json</h2>
``` javascript
import { json } from 'ex-stream/Json';
```
> JSON stream factory function

``` javascript
function json()
```
