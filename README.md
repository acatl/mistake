# mistake
> create error object

## Arguments

`mistake(name, message|spec, Factory)`

- **name** | `String` : name of the error (`error.name`)
- **message** | `String` : message of the error (`error.message`)
- **spec** | `Object` : Object with keys-values that will get passed to the Error instance
- **Factory** | `Function` : *optional* Function constructor you want your Error based off.

### basic

```js
var mistake = require('mistake');

throw mistake('Foo', 'I just fooed');
```

### name and hash

```js
var mistake = require('mistake');

throw mistake('Foo', {
  message: 'I just fooed',
  foo: 'bar'
});
```

### name and hash and constructor

```js
function MyError(message) {
  this.name = 'MyError';
  this.message = message || 'Default Message';
  this.bar = 'foo';
}

var mistake = require('mistake');

throw mistake('Foo', {
  message: 'I just fooed',
  foo: 'bar'
}, MyError);
```
