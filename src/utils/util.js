/**
 * 判断元素是否在数组内
 * @param {元素值} value 
 * @param {数组} arr 
 * @return true/false
 */

export function oneOf (value, arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (value === arr[i]) {
      return true;
    }
  }
  return false;
}

// 向上查找组件
export function findComponentUpward (context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

// 向下查找组件
export function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}