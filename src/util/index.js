// 判断类型
export const is = {
  Type: (val) => Object.prototype.toString.call(val).slice(8, -1),
  Void: (val) => is.Undefined(val) || is.Null(val) || is.NaN(val),
  Undefined: (val) => is.Type(val) === 'Undefined',
  Null: (val) => is.Type(val) === 'Null',
  NaN: (val) => is.Type(val) === 'NaN',
  Number: (val) => is.Type(val) === 'Number',
  String: (val) => is.Type(val) === 'String',
  Object: (val) => is.Type(val) === 'Object',
  Array: (val) => is.Type(val) === 'Array',
  Date: (val) => is.Type(val) === 'Date'
}

// 判断全等
export const equals = (a, b) => {
  if (a === b) return true;
  if (is.Date(a) && is.Date(b)) return a.getTime() === b.getTime();
  if (is.Void(a) || is.Void(b) || !is.Object(a) && !is.Object(b)) return a === b;
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
    if (is.Number(expire)) data.expire = new Date() * 1 + expire;
    this.storage.setItem(key, JSON.stringify(data))
    return true;
  }
  getItem(key) {
    const data = JSON.parse(this.storage.getItem(key));
    if (!is.Undefined(data.expire) && data.expire > new Date() * 1) return data.val;
    this.removeItem(key);
    return false;
  }
  removeItem(key) {
    this.storage.removeItem(key)
  }
  clear() {
    this.storage.clear()
  }
}

export const LS = new Storage(window.localStorage);
export const SS = new Storage(window.sessionStorage);

/**
 * 函数柯里化
 * @param {Function} fn
 * @param  {Array[any]} firstArgs
 * @returns
 */
export const currying = function (fn, ...firstArgs) {
  return function (...args) {
    if (firstArgs.length) args = firstArgs.concat(args);
    if (args.length < fn.length) return createCurry(fn, ...args);
    return fn.apply(null, args)
  }
}

/**
 * 将函数组合起来
 * 比如：原先的调用方式是这样 f(g(k(p(x))))，可以改成这样 compose(f, g, k, p)(x)
 * @param  {Array{Function]} fnArr
 * @returns
 */
export const compose = function (...fnArr) {
  if (!fnArr.length) return arg => arg;
  if (fnArr.length === 1) return fnArr[0];
  return fnArr.reduce((preFn, curFn) => (...rest) => curFn(preFn(...rest)))
}


/**
 * 转义 HTML 字符串，防止 XSS 攻击
 * @param {*} str
 * @returns
 */
export const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );