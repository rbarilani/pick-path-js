/**
 * Get the value by [path].
 * The [path] is a string where props are delimited by points. <'my.prop'>
 *
 * @example
 *
 * ```js
 *
 * var obj = {
   *   foo: {
   *     bar: { john: [99,100] }
   *   },
   *   john: { doe: 'Hello World' }
   * };
 *
 * pickPath(obj, 'john.doe')        # 'Hello World'
 * pickPath(obj, foo.bar')          # { john: [99,100] }
 * pickPath(obj, 'foo.bar.john[1]') # 100
 *
 * // or with the
 * // mixin functionality
 * pickPath.mixin(obj);
 *
 * obj.pickPath('john.doe')        # 'Hello World'
 * obj.pickPath('foo.bar')         # { john: [99,100] }
 * obj.pickPath('foo.bar.john[1]') # 100
 *
 * ```
 *
 * @param {Object} obj
 * @param {String} path
 * @returns {*}
 */
export default function pickPath (obj, path) {
  if (arguments.length == 1) {
    return obj;
  }
  if (!path || typeof path !== 'string') {
    return;
  }
  let props = getProps(path);
  var ref = obj;
  props.some((prop) => {
    try {
      ref = getPropValue(ref, prop);
    } catch (e) {
      return true;
    }
  });
  return ref;

}

pickPath.mixin = function (obj) {
  obj.pickPath = function (path) {
    return pickPath(this, path);
  };
  return obj;
};

/**
 * @private
 * @param {String} path
 * @returns {Array<String>}
 */
function getProps(path) {
  return path.split('.').map((prop) => {
    return prop.trim();
  })
  .filter((prop) => {
    return prop !== '';
  });
}

/**
 * @private
 * @param {String} prop
 * @returns {null|Array<String|*>}
 */
function findArrayPropMatch(prop) {
  let found = prop.match(/^(.*)\[([0-9]{1,})\].*$/);
  if (found && found.length === 3) {
    return [found[1], parseInt(found[2])];
  }
  return null;
}

/**
 * @private
 * @param ref
 * @param {String} prop
 * @returns {*}
 */
function getPropValue(ref, prop) {
  let arrayPropMatch = findArrayPropMatch(prop);
  if (arrayPropMatch) {
    return ref[arrayPropMatch[0]] ? ref[arrayPropMatch[0]][arrayPropMatch[1]] : ref[prop];
  }
  return ref[prop];
}
