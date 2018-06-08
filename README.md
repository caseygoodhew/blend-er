# Blender
Blender resolves relative urls.

## installation
```bash
$ npm install blend-er
```

## usage
```js
const blender = require('blend-er');

const relative = '/api';
const context = 'http://mysite.com/homepage';
console.log(blender(relative, context));
```
```bash
http://mysite.com/api
```

```js
blender('/api', 'http://c.d/test/status');   // 'http://c.d/api'
blender('api', 'http://c.d/test/status');    // 'http://c.d/test/status/api'
blender('./api', 'http://c.d/test/status');  // 'http://c.d/test/status/api'
blender('../api', 'http://c.d/test/status'); // 'http://c.d/test/api'
blender('../api', 'http://c.d/test');        // 'http://c.d/api'
blender('../../api', 'http://c.d/test');     // 'http://c.d/api'
```
```js
blender('/api', 'http://c.d?query');         // 'http://c.d/api'
blender('/api?query', 'http://c.d');         // 'http://c.d/api?query'
blender('/api?query', 'http://c.d?nop');     // 'http://c.d/api?query'
```
```js
blender('/api', 'http://c.d#hash');          // 'http://c.d/api'
blender('/api#hash', 'http://c.d#nop');      // 'http://c.d/api#hash'
blender('/api#hash', 'http://c.d');          // 'http://c.d/api#hash'
```
```js
blender('http://a.b/api', 'http://c.d');     // 'http://a.b/api'
```
# what more examples?
[Checkout the tests!](test/blender.spec.js)
