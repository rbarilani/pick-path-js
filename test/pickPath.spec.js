import pickPath from '../src/pickPath.js';

describe('pickPath', function () {
  var obj, objJson;

  beforeEach(() => {
    obj = {
      foo: {
        bar: {
          john: 'Doe',
          posts: [
            'John',
            'Doe'
          ]
        }
      },
      bar: true,
      posts:  [
        'Hello',
        'World',
        { message : 'bar' }
      ]
    };
    objJson = JSON.stringify(obj);
  });

  describe('pickPath(obj, path)', () => {
    it('should return the object if no path is provided', () => {
      expect(pickPath(obj)).toEqual(obj);
    });

    it('should return "undefined" if wrong path type is provided (not a string)', () => {
      expect(pickPath(obj, false)).toBeUndefined();
      expect(pickPath(obj, null)).toBeUndefined();
      expect(pickPath(obj, 0)).toBeUndefined();
      expect(pickPath(obj, 1)).toBeUndefined();
    });

    it('should return the correct value for the provided path... or just it should work :)', () => {
      expect(pickPath(obj, 'foo')).toBe(obj.foo);
      expect(pickPath(obj, 'foo.bar.john')).toBe('Doe');
      expect(pickPath(obj, 'foo.bar.john')).toBe(obj.foo.bar.john);
      expect(JSON.stringify(obj)).toBe(objJson);
    });

    it('should return the correct value for the provided path using the array syntax', () => {
      expect(pickPath(obj, 'posts[1]')).toBe(obj.posts[1]);
      expect(pickPath(obj, 'foo.bar.posts[1]')).toBe(obj.foo.bar.posts[1]);
      expect(pickPath(obj, 'foo.bar.cats[44]')).toBeUndefined();
      expect(pickPath(obj, 'posts[2].message')).toBe(obj.posts[2].message);
      expect(pickPath(obj, 'foo.posts[2].message')).toBeUndefined();
    });

    it('should return the updated value if it was changed', () => {
      expect(pickPath(obj, 'foo.bar.john')).toBe('Doe');
      obj.foo.bar.john = 'Ueeee'; // change data
      objJson = JSON.stringify(obj);
      expect(pickPath(obj, 'foo.bar.john')).toBe(obj.foo.bar.john);
      expect(pickPath(obj, 'foo.bar.john')).toBe('Ueeee');
      expect(JSON.stringify(obj)).toBe(objJson);
    });
  });
});
