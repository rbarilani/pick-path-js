pick-path-js
============

Utility function to access deep object properties by path.

## Usage

```js

import pickPath from 'pick-path-js';

var obj = {
  foo: {
    bar: { john: [99, 100] }
  },
  john: { doe: 'Hello World' }
};

pickPath(obj, 'john.doe');        // # 'Hello World'
pickPath(obj, 'foo.bar');         // # { john: [99,100] }
pickPath(obj, 'foo.bar.john[1]'); // # 100

// using the mixin method
pickPath.mixin(obj);

obj.pickPath('john.doe');        // # 'Hello World'
obj.pickPath('foo.bar');         // # { john: [99,100] }
obj.pickPath('foo.bar.john[1]');  // # 100

```
