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
    const item = this.storage.getItem(key);
    if (is.Void(item)) return false;
    const data = JSON.parse(this.storage.getItem(key));
    if (is.Undefined(data.expire)) return data.val;
    else if (!is.Undefined(data.expire) && data.expire > new Date() * 1) return data.val;
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


export const audioControl = {
  getAudioBuffer: (url) => {
    return new Promise((resolve, reject) => {
      audioControl.createArrayBuffer(url)
        .then(audioControl.cutAudioBuffer)
        .then(resolve)
        .catch(reject)
    })
  },
  cutAudioBufferWidthUrl: (url, endSecond) => {
    return new Promise((resolve, reject) => {
      audioControl.getAudioBuffer(url)
        .then((audioBuffer) => audioControl.cutAudioBuffer(audioBuffer, endSecond))
        .then(audioBuffer => resolve(audioBuffer))
        .catch(err => reject(err));
    })
  },
  createArrayBuffer: (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onload = e => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(xhr.response);
        reader.onload = (event) => {
          const arrayBuffer = event.target.result;
          const audioCtx = new AudioContext();
          audioCtx.decodeAudioData(arrayBuffer)
            .then(res => resolve(res))
            .catch(err => reject(err));
        }
      };
      xhr.send()
    })
  },
  cutAudioBuffer: (audioBuffer, seconds) => {
    // 音频时长、采样频率、声道数量
    const { duration, sampleRate, numberOfChannels } = audioBuffer;
    if (!is.Number(seconds)) seconds = duration;
    // 截取前 seconds
    const startOffset = 0;
    const endOffset = sampleRate * seconds;
    // 前 seconds 对应的帧数
    const frameCount = endOffset - startOffset;
    // 创建同样采用率、同样声道数量，长度是前3秒的空的 AudioBuffer
    const newAudioBuffer = new AudioContext().createBuffer(numberOfChannels, frameCount, sampleRate);
    // 创建临时的 Array 存放复制的buffer数据
    const anotherArray = new Float32Array(frameCount);
    // 声道的数据的复制和写入
    const offset = 0;
    for (let channel = 0; channel < numberOfChannels; channel++) {
      audioBuffer.copyFromChannel(anotherArray, channel, startOffset);
      newAudioBuffer.copyToChannel(anotherArray, channel, offset);
    }
    return newAudioBuffer;
  },
  blobToAudioBuffer: async (blobs) => {
    if (!is.Array(blobs)) blobs = [blobs];
    const buffers = [];
    const promises = [];
    for (let blob of blobs) {
      const p = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onload = function () {
          resolve(this.result);
        }
      });
      promises.push(p);
    }
    const arrayBuffers = await Promise.all(promises);
    for (let arrayBuffer of arrayBuffers) {
      const audioCtx = new AudioContext();
      const buffer = await audioCtx.decodeAudioData(arrayBuffer);
      buffers.push(buffer);
    }
    return buffers;
  }
}

// 防抖
export const debounce = (fn, wait = 200, immediate = false) => {
  let timer = null

  // 此处一定要用 function，否则 this 的指向会错误
  return function (...args) {
    if (timer != null) {
      clearTimeout(timer)
    }

    if (immediate && timer == null) {
      fn.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, wait)

      return
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
}

// 防抖
export const debounceTwo = (fn, wait = 200, immediate = false) => {
  let timer = null
  // 此处一定要用 function，否则 this 的指向会错误
  return function (...args) {
    if (!is.Void(timer)) {
      clearTimeout(timer);
      return;
    }

    if (immediate && is.Void(timer)) {
      fn.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, wait)

      return
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
}


class IndexedDBFactory {
  constructor(dbName = 'dbName', dbVersion = 1) {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
    this.initial = false;
    this.init();
  }
  static destroy = (dbName) => {
    const indexDB = window.indexedDB;
    if (!!indexDB === false) throw new Error('该浏览器不支持 indexedDB 存储');
    indexDB.deleteDatabase(dbName);
  }
  init = (dbVersion) => {
    const indexDB = window.indexedDB;
    if (!!indexDB === false) throw new Error('该浏览器不支持 indexedDB 存储');
    this.dbRequest = indexDB.open(this.dbName, dbVersion || this.dbVersion);
    this.dbRequest.addEventListener('error', (e) => {
      // 使得初始化时，获取到最新版本号
      const err = e.target.error;
      if (err.name === 'VersionError') {
        const newVersion = err.message.match(/\d/g)[1];
        this.dbVersion = newVersion;
      }
    });
    this.dbRequest.addEventListener('success', (e) => console.log(e));
    this.initial = true;
    return this;
  }

  createStore = (storeName = 'storeName', storeOption = { autoIncrement: true }) => {
    this.dbRequest.addEventListener('upgradeneeded', (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, storeOption)
      }
    })
    return this;
  }

  createTransaction = (storeName, mode, method, data) => {
    if (!Array.isArray(storeName)) storeName = [storeName];
    const transaction = this.db.transaction(storeName, mode)
    const request = transaction.objectStore(storeName)[method](data);
    return new Promise(function (resolve, reject) {
      const res = []
      request.onsuccess = (e) => {
        if (method === 'openCursor') {
          const cursor = e.target.result;
          if (!cursor) { resolve(res); return; }
          res.push(cursor.value);
          cursor.continue();
        } else {
          resolve(e.target.result || true);
        }
      }
      request.onerror = (e) => reject(e.target.error)
    })
  }

  upgradeVersion = () => {
    const indexDB = window.indexedDB;
    if (!!indexDB === false) throw new Error('该浏览器不支持 indexedDB 存储');
    this.dbRequest = indexDB.open(this.dbName, ++this.dbVersion);
    return this;
  }

  // 增删查改的装饰器
  operateDecorate = (storeName, mode = 'readonly', method = 'get', data) => {
    this.upgradeVersion()
    return new Promise((resolve, reject) => {
      if (!this.db) {
        this.dbRequest.addEventListener('success', (e) => {
          this.db = e.target.result;
          this.createTransaction(storeName, mode, method, data)
            .then(res => resolve(res))
        })
      } else {
        this.createTransaction(storeName, mode, method, data)
          .then(res => resolve(res))
      }
    })
  }

  add = (storeName, data) => this.operateDecorate(storeName, 'readwrite', 'add', data);

  get = (storeName, key) => this.operateDecorate(storeName, 'readonly', 'get', key);

  delete = (storeName, key) => this.operateDecorate(storeName, 'readwrite', 'delete', key);

  getAll = (storeName) => this.operateDecorate(storeName, 'readonly', 'openCursor');

  clear = (storeName) => this.operateDecorate(storeName, 'readwrite', 'clear')
}

export class MyIndexedDB {
  constructor(dbName, dbVersion) {
    const instance = new IndexedDBFactory(dbName, dbVersion);
    for (let key in instance) {
      if (this.isFunction(instance[key])) {
        if (key !== 'init') {
          const oldFn = instance[key];
          instance[key] = function (...args) {
            if (!instance.initial) throw Error('请先初始化 indexedDB 的数据库');
            return oldFn.apply(instance, args);
          }
        }
      }
    }
    return instance;
  }
  isFunction = (obj) => Object.prototype.toString.call(obj).slice(8, -1) === 'Function'
}

const audioList = new MyIndexedDB('audioList');
const mainTrack = audioList.init().createStore('mainTrack', { keyPath: 'name' });
const subTrack = audioList.upgradeVersion().createStore('subTrack', { keyPath: 'name' });

export const audioDB = {
  mainTrack,
  subTrack,
  urls: {
    subTrack: {},
    mainTrack: {}
  }
}