
const cached = fn => {
  const cache = Object.create(null)
  return str => cache[str] || (cache[str] = fn(str))
}

const makeMap = str => {
  const map = Object.create(null)
  const list = str.split(',')
  list.forEach(key => (map[key] = true))
  return val => map[val]
}

const expression2camelCase = expression =>
  expression
    .split('.')
    .map(
      item =>
        item
          .replace(/[^a-zA-z]/g, '')
          .substring(0, 1)
          .toUpperCase() + item.replace(/[^a-zA-z]/g, '').substring(1)
    )
    .join('')
    .replace(/\b\S/, s => s.toLowerCase())

const expression2camelCaseCached = cached(expression2camelCase)

const _toString = Object.prototype.toString

const isPlainObject = (obj) => {
  return _toString.call(obj) === "[object Object]";
};

export { makeMap, isPlainObject, expression2camelCaseCached };
