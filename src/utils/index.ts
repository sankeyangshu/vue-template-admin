/**
 * @description: 通过时间返回对应的欢迎语
 * @return {string} 欢迎语
 */
export function getTimeStateStr(): string {
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
}
