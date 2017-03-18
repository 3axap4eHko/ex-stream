# LogStream

Logs stream data


- [`class LogStream`](#class-logstream)
  - [`constructor()`](#logstream-constructor-constructor)


- [`function log`](#function-log)
<a id="class-logstream"></a><h2>class LogStream</h2>
> Logs stream data

<h2>Constructor</h2>

``` javascript
constructor()
```
<a id="logstream-constructor-constructor"></a>

**Example**:
  ``` javascript
  import { appendFileSync } from 'fs';
import { log } from 'ex-stream/LogStream';

const logger = log();
logger.end('test'); // logs 'test' to stdout

const errorLogger = log();
errorLogger.write('test'); // logs 'test' to stderr

const fileLogger = log({
   logger(data) {
     appendFileSync('filename.log', data);
   }
});
fileLogger.write('test'); // logs 'test' to file
  ```
---<a id="function-log"></a><h2>function log</h2>``` javascript
function log(options)
```
> Log stream factory function



**Arguments:**

- `options`: `Object`

**Returns:** `LogStream`

