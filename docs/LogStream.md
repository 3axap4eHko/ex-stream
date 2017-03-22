# LogStream

- [`class LogStream`](#class-logstream)
  - [`constructor()`](#logstream-constructor-constructor)
- [`function log`](#function-log)

<a id="class-logstream"></a><h2>class LogStream</h2>
``` javascript
import LogStream from 'ex-stream/LogStream';
```
> Logs stream data



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



<h2>Constructor</h2>
<a id="logstream-constructor-constructor"></a>


---

<a id="function-log"></a><h2>function log</h2>
``` javascript
import { log } from 'src/LogStream';
```
> Log stream factory function

``` javascript
function log(options)
```
