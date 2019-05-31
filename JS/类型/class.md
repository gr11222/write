class 和 function区别
重复定义
function会覆盖之前定义的方法class会报错
class会报错（和let一样）

class静态方法与静态属性

class没有变量提升

class中定义的方法不可用Object.keys(Point.prototype)枚举到
function构造器原型方法可被Object.keys(Point.prototype)枚举到，除过constructor
所有原型方法属性都可用Object.getOwnPropertyNames(Point.prototype)访问到

都可通过实例的__proto__属性向原型添加方法

new.target