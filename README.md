# mistake
> create error object

`npm install mistake`

## Arguments

`mistake(name, message|spec, Factory)`

- **name** | `String` : name of the error (`error.name`)
- **message** | `String` : message of the error (`error.message`)
- **spec** | `Object` : Object with keys-values that will get passed to the Error instance
- **Factory** | `Function` : *optional* Function constructor you want your Error based off.

## Notes:

This project uses [UMD](https://github.com/umdjs/umd) wrapper, meaning it can be used via Node (CommonJs), (AMD) RequireJs or global through `window.mistake`.

**Node:**

```js
var mistake = require('mistake');
var error = mistake('My Error');
```

**RequireJs:**

```js
define(['mistake'], function(mistake){
  var error = mistake('My Error');
});
```

**Globally:**

```js
var mistake = window.mistake;
var error = mistake('My Error');
```

### Implementation

##### basic

```js
var mistake = require('mistake');

throw mistake('Foo', 'I just fooed');
```

##### name and hash

```js
var mistake = require('mistake');

throw mistake('Foo', {
  message: 'I just fooed',
  foo: 'bar'
});
```

##### name and hash and constructor

```js
var mistake = require('mistake');

function MyError(message) {
  this.name = 'MyError';
  this.message = message || 'Default Message';
  this.bar = 'foo';
}

throw mistake('Foo', {
  message: 'I just fooed',
  foo: 'bar'
}, MyError);
```
