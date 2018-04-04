/**
 * 判断元素是否在数组内
 * @param {元素值} value 
 * @param {数组} arr 
 * @return true/false
 */

export function isContains (value, arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (value === arr[i]) {
      return true;
    }
  }
  return false;
}