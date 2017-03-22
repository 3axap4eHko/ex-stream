# Composer

- [`class Composer`](#class-composer)
  - [`constructor()`](#composer-constructor-constructor)
  - [`pipe()`](#composer-method-pipe)
  - [`unpipe()`](#composer-method-unpipe)
- [`function compose`](#function-compose)

<a id="class-composer"></a><h2>class Composer</h2>
``` javascript
import Composer from 'ex-stream/Composer';
```
> Compose streams into single stream



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



<h2>Constructor</h2>
<a id="composer-constructor-constructor"></a>

---

<h2>Methods</h2>
<a id="composer-method-pipe"></a>

``` javascript
pipe(stream: Stream)
```


**Parameters:**

- `stream`: `Stream`

**Returns:** `Stream`


---
<a id="composer-method-unpipe"></a>

``` javascript
unpipe(stream: Stream)
```


**Parameters:**

- `stream`: `Stream`

**Returns:** `Stream`




---

<a id="function-compose"></a><h2>function compose</h2>
``` javascript
import { compose } from '/Users/izakharc/projects/ex-stream/src/Composer';
```
> Composer factory function

``` javascript
function compose(options)
```

> Composer factory function

**Parameters:**

- `options`: `Object`

**Returns:** `Composer`

