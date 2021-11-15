// 简单模拟枚举
export default class Enum {
  constructor(originData) {
    this.enum = originData;
  }
  set enum(originData) {
    // 如果传入的是数组，则以下标作为 key 值
    let originObj = Array.isArray(originData) ? {
      ...originData
    } : originData;
    this.originObj = originObj;
    // 遍历值双向映射到 Enum 实例中
    for (let key in originObj) {
      this[key] = originObj[key];
      this[originObj[key]] = Number(key);
    }
  }
  // 将 Enum 传入的对象转换成 antd 表单要的 options 形式
  toOptions() {
    return Object
      .entries(this.originObj)
      .map(([value, label]) => ({
        label,
        value: +value // 字符串转为数字
      }));
  }
}