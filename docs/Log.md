# Log

- [`class Log`](#class-log)
  - [`constructor()`](#log-constructor-constructor)
- [`function log`](#function-log)

<a id="class-log"></a><h2>class Log</h2>
``` javascript
import Log from 'ex-stream/Log';
```
> Logs stream data



``` javascript
import { appendFileSync } from 'fs';
import { log } from 'ex-stream/Log';

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



<h3>Constructor</h3>
<a id="log-constructor-constructor"></a>


**Parameters:**

- `logger`: `Function`
- `options`: `Object`



> Creates Log stream instance


``` javascript
new Log({
   logger(data) {
     console.log(data);
   }
 })
```


---

<a id="function-log"></a><h2>function log</h2>
``` javascript
import { log } from 'ex-stream/Log';
```
> Log stream factory function

``` javascript
function log(options)
```
