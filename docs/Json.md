# Jsonify

- [`class Json`](#class-json)
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



---

<a id="function-json"></a><h2>function json</h2>
``` javascript
import { json } from '/Users/izakharc/projects/ex-stream/src/Json';
```
> JSON stream factory function

``` javascript
function json()
```

> JSON stream factory function

**Returns:** `Json`

