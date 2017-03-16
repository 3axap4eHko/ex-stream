# Composer

Compose streams into single stream


- [`class Composer`](#class-composer)
  - [`constructor()`](#composer-constructor-constructor)
  - [`pipe()`](#composer-method-pipe)
  - [`unpipe()`](#composer-method-unpipe)


- [`function compose`](#function-compose)


<a id="class-composer"></a><h2>Composer</h2>
> Compose streams into single stream


<a id="composer-constructor-constructor"></a>
```javascript
new Composer(streams: Array.<Stream>, options: Object)
```

---



<h2>Methods</h2>
<a id="composer-method-pipe"></a>
<h3>pipe(stream: Stream)</h3>

> 

**Arguments:**
  
- `stream`: `Stream`

**Returns:** `Stream`

---
<a id="composer-method-unpipe"></a>
<h3>unpipe(stream: Stream)</h3>

> 

**Arguments:**
  
- `stream`: `Stream`

**Returns:** `Stream`

---





---

<a id="function-compose"></a><h2>compose</h2>
> Composer factory function


``` javascript
function compose(options)
```


> Composer factory function

**Arguments:**
  
- `options`: `Object`

**Returns:** `Composer`


