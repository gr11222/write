function fn(arr) {
  return arr.reduce((arr, cur) => {
    return Array.isArray(cur) ? [...arr, ...fn(cur)] : [...arr, cur]
  }, [])
}

console.log(fn(([1, [2, [3]], 4, 5, [6]])))