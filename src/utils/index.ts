/**
 * @description: 通过时间返回对应的欢迎语
 * @return {string} 欢迎语
 */
export const getTimeStateStr = (): string => {
  const timeNow = new Date();
  const hours = timeNow.getHours();
  // 判断当前时间段
  if (hours >= 6 && hours <= 10) {
    return '早上好';
  } else if (hours >= 10 && hours <= 14) {
    return '中午好';
  } else if (hours >= 14 && hours <= 18) {
    return '下午好';
  } else {
    return '晚上好';
  }
};

/**
 * 欢迎语
 */
export const welcome = () => {
  const arr = [
    '加油努力工作',
    '喝一杯咖啡吧',
    '休息一会儿吧',
    '准备吃什么呢',
    '要不要站起来活动一下',
  ];
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return {number} 随机数
 */
export const randomNum = (min: number, max: number): number => {
  const num = Math.floor(Math.random() * (min - max) + max);
  return num;
};

/**
 * @description 判断数据类型
 * @param {any} val 需要判断类型的数据
 * @return {string} 数据类型
 */
export const isType = (val: any): string => {
  if (val === null) return 'null';
  if (typeof val !== 'object') return typeof val;
  else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};

/**
 * @description: 将对象作为参数添加到URL
 * @param {string} baseUrl url路径
 * @param {any} obj 对象
 * @return {string} 拼接好的URL路径
 */
export const getQueryObject = (baseUrl: string, obj: any): string => {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
};
