# Jsonify

Converts stream text data to JSON object


- [`class Json`](#class-json)


- [`function json`](#function-json)
<a id="class-json"></a><h2>class Json</h2>
> Converts stream text data to JSON object

**Example**:
  ``` javascript
  import { createServer } from 'http';
import { json } from 'ex-stream/Json';

createServer((req, res) => {
   req
     .pipe(json())
     .pipe(res);
}).listen(3000, 'localhost');
  ```
---<a id="function-json"></a><h2>function json</h2>``` javascript
function json()
```
> JSON stream factory function



**Returns:** `Json`

