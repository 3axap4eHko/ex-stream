# Composer

Compose streams into single stream


- [`class Composer`](#class-composer)
  - [`constructor()`](#composer-constructor-constructor)
  - [`pipe()`](#composer-method-pipe)
  - [`unpipe()`](#composer-method-unpipe)


- [`function compose`](#function-compose)
<a id="class-composer"></a><h2>class Composer</h2>
> Compose streams into single stream

<h2>Constructor</h2>

``` javascript
constructor(options.streams: Array.<Stream>, options: Object)
```
<a id="composer-constructor-constructor"></a>

**Arguments:**

- `options.streams`: `Array.<Stream>` - Array of Streams
- `options`: `Object` - Stream options


---
<h2>Methods</h2>
<a id="composer-method-pipe"></a>

``` javascript
pipe(stream: Stream)
```


**Arguments:**

- `stream`: `Stream`

**Returns:** `Stream`
---
<a id="composer-method-unpipe"></a>

``` javascript
unpipe(stream: Stream)
```


**Arguments:**

- `stream`: `Stream`

**Returns:** `Stream`

**Example**:
  ``` javascript
  import { createWriteStream } from 'fs';
import { compose } from 'ex-stream/Composer';

const fileStream = fs.createWriteStream('myapp.log');
const composed = compose({
   streams: [
     fileStream,
     process.stdout,
   ]
});
composed.end('Some data'); // write to file and stdout
  ```
---<a id="function-compose"></a><h2>function compose</h2>``` javascript
function compose(options)
```
> Composer factory function



**Arguments:**

- `options`: `Object`

**Returns:** `Composer`

