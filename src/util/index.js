// 判断类型
export const is = {
  isType: (val) => Object.prototype.toString.call(val).slice(8, -1),
  isVoid: (val) => is.isUndefined(val) || is.isNull(val) || is.isNaN(val),
  isUndefined: (val) => is.isType(val) === 'Undefined',
  isNull: (val) => is.isType(val) === 'Null',
  isNaN: (val) => is.isType(val) === 'NaN',
  isNumber: (val) => is.isType(val) === 'Number',
  isString: (val) => is.isType(val) === 'String',
  isObject: (val) => is.isType(val) === 'Object',
  isArray: (val) => is.isType(val) === 'Array',
  isDate: (val) => is.isType(val) === 'Date'
}

// 判断全等
export const equals = (a, b) => {
  if (a === b) return true;
  if (is.isDate(a) && is.isDate(b)) return a.getTime() === b.getTime();
  if (is.isVoid(a) || is.isVoid(b) || !is.isObject(a) && !is.isObject(b)) return a === b;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};

/**
 * 构造 Storage 类，方便生产 localStorage、sessionStrage 工具函数
 */
class Storage {
  constructor(storage) {
    this.storage = storage;
  }
  setItem(key, val, expire) {
    const data = { val };
    if (is.isNumber(expire)) data.expire = new Date() * 1 + expire;
    this.storage.setItem(key, JSON.stringify(data))
    return true;
  }
  getItem(key) {
    const data = JSON.parse(this.storage.getItem(key));
    if (!is.isUndefined(data.expire) && data.expire > new Date() * 1) return data.val;
    this.removeItem(key);
    return false;
  }
  removeItem(key) {
    this.storage.removeItem(key)
  }

}

export const LS = new Storage(window.localStorage);
export const SS = new Storage(window.sessionStorage);

