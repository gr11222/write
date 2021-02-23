function initData (vm: Component) {
  let data = vm.$options.data
  // 获得传入的data.此处为{a:1, b：2}
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  // 如果data不是纯对象，则打印警告信息
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // 获得data中所有的key,即a,b
  const keys = Object.keys(data)
  // 获得组件中定义的props与methods
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    // data中的第i个k
    const key = keys[i]
    // 如果methods中定义过相同的key，报错
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    // 如果props中定义过相同的key，报错
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    // 如果key不是保留关键字,即不是_或者$开头的key。
    } else if (!isReserved(key)) {
      // 将属性代理到实例的_data属性上。
      // 例如vm.a = 1实际上会被处理为vm._data.a = 1;
      // vm.a 将返回 vm._data.a;
      proxy(vm, `_data`, key)
    }
  }
  // 让data变为响应式数据，即数据改变时候，UI也能跟着变。
  observe(data, true /* asRootData */)
}
observe
export function observe (value: any, asRootData: ?boolean): Observer | void {
  // 如果设置的参数value不是一个对象或者是一个虚拟dom。则直接返回。
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  // 如果这个value存在观察者实例，则赋给返回值
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    observerState.shouldConvert &&  // 需要转化
    !isServerRendering() && // 非服务端渲染
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue // 是数组或者对象且可以扩展属性，且不是vue组件实例
  ) {
    // 根据给定的值创建一个观察者实例
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  // 返回观察者实例
  return ob
}
new Observer(value)
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data

  constructor (value: any) {
    // 要被观察的值
    this.value = value
    // new 一个用来收集依赖的对象
    this.dep = new Dep()
    this.vmCount = 0
    // 将该Observer实例，赋值给value的__ob__属性。
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      const augment = hasProto
        ? protoAugment
        : copyAugment
      // 如果是数组的话，需要对数组的方法做特殊处理，
      // 并且依次的让数组的每个对象元素变为可观察的
      augment(value, arrayMethods, arrayKeys)
      this.observeArray(value)
    } else {
      // 否则是对象的话，依次遍历每个属性，并设置其
      // getter与setter，支持后续的响应式变化。
      this.walk(value)
    }
  }

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
observe 与 Observer简单说明
observe使一个对象变为响应式对象，在其值改变时候，可触发ui改变。其做法是为每一个value(非原始类型的)设置一个__ob__，即Observer对象实例。如果value是一个对象，会遍历它的每一个key，然后为其设置setter/getter，如果是数组会对数组元素依次的递归observe。

假设输入为data = {a: 1, b: 2}
经过observe后，会变成
data = {a: 1, b:2, __ob__: ObserverInstance, a的 getter,setter,b的getter, b的setter}。
其中ObserverInstance.dep用来收集对这个对象变更感兴趣的watcher，
其中ObserverInstance.value指向这个对象data;
defineReactive
为了以最简单的方式说明流程，这里我们只看对象的处理情况，到了这里，我们的逻辑进入walk函数内部，遍历对象的每个属性，即a,b；分别定义为响应式属性。

export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  // 这里的Dep还是Watcher收集器，用来收集对该变量感兴趣的watcher
  const dep = new Dep()
  // 获取属性描述符，不熟悉的同学请查阅es6的文档
  const property = Object.getOwnPropertyDescriptor(obj, key)
  // 如果属性描述符显示该对象不可配置，
  // 即无法设置getter，setter，也就无法处理为响应式属性了，那直接返回。
  // 一般我们定义的data里很少设置属性描述符，默认property => undefined
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set

  // 如果该obj的key，对应的val还是对象，则使其也变成可观察的对象
  // 这里是一个递归处理，shallow标识是否深度处理该值。
  // 类似深拷贝，浅拷贝中是否深拷贝的逻辑。
  let childOb = !shallow && observe(val)
  // 重点，设置getter,setter,这里我们定义data.a的getter,setter,
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {

      // 这里一般对象的属性是没有getter的，直接返回val
      const value = getter ? getter.call(obj) : val
      // 在特定的时机进行依赖收集。通过Dep.target
      // 这里在后期vue处理模板template的时候，会生成render函数，
      // render函数执行生成虚拟dom时候会去读取vm实例的属性，比如vm.a这时候会触发这个getter，
      // 此时的Dep.target为一个watcher，
      // 内容为vm._update(vm._render)这个函数，用来更新视图用
      // 将该函数添加到defineReactive内部定义的dep中。
      // 接下来我们看后面的set部分
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      // 当我们触发点击事件时候，this.a += 1;
      // 此时newVal是value值加1，所以代码会继续走
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // 这里设置了newVal为val
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 如果新值是一个对象，会继续被当做可观察的对象。
      childOb = !shallow && observe(newVal)
      // dep.notify就是挨个通知Dep中收集的watcher去搞事情。
      // get函数内我提到,dep中被加入了一个watcher，
      // 其watcher实际作用就是触发视图更新，get时候，被收集了，
      // set时候就会触发ui的更新。
      dep.notify()
    }
  })
}
initData的完结
至此initData完结，上文中defineReactive的getter和setter的设定，在前期到不会触发，这里只是把规矩定下，真正用到的时候还需要跟模板结合。这个章节我们主要分析一下initData对data的处理。接下来我们看下模板的地方。

首先我们需要把代码跳出来看这里，不要问我为什么知道看这里，因为我是看完一遍后有个印象，现在只不过在梳理流程。

this.init -> initState -> initData
this.init -> initState ->
this.init
this.init -> vm.$mount(vm.options.el)
这里我们再贴一下init内部函数的代码，让大家对大概的方位有个了解

Vue.prototype._init = function (options?: Object) {

  // ***************************省略顶部代码
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')

  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    vm._name = formatComponentName(vm, false)
    mark(endTag)
    measure(`vue ${vm._name} init`, startTag, endTag)
  }

  if (vm.$options.el) {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    vm.$mount(vm.$options.el)
  }

}
vm.$mount
接下来我们简述一下vm.$mount内部的代码

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  // 根据id查找dom元素
  el = el && query(el)
  // 巴拉巴拉省略魔法

  // 如果没有render函数则生成render函数
  const { render, staticRenderFns } = compileToFunctions(template, {
    shouldDecodeNewlines,
    delimiters: options.delimiters,
    comments: options.comments
  }, this)
  options.render = render
  options.staticRenderFns = staticRenderFns

  return mount.call(this, el, hydrating)
}
compileToFunctions生成的render函数
compileToFunctions是怎么根据模板生成html的，这不本章节的重点，后面我会单独去写compileToFunctions的过程，本章节重点是render函数的结果，我以上一章节的html为例，这是render函数的结果。

(function anonymous() {
  with (this) {
      return _c('div', {
          attrs: {
              "id": "demo"
          }
      }, [_c('div', [_c('p', [_v("a：" + _s(a))]), _v(" "), _c('p', [_v("b: " + _s(b))]), _v(" "), _c('p', [_v("a+b: " + _s(total))]), _v(" "), _c('button', {
          on: {
              "click": addA
          }
      }, [_v("a+1")])])])
  }
})
其中_c就是vue封装的createElement,用来生成虚拟dom。_s就是toString方法，等等。这里我们可以看到其中有些参数是变量，a,b,total。这与我们在js中定义的一致。接下来我们看下这个渲染函数执行的地方。

mount.call
首先还是接上面的代码。mount.call(this, el, hydrating)。

Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
mountComponent
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el

  // 巴拉巴拉省略大法，去除无关代码

  callHook(vm, 'beforeMount')

  // 巴拉巴拉省略大法，去除无关代码

  let updateComponent
  /* istanbul ignore if */

  updateComponent = () => {
    vm._update(vm._render(), hydrating)
  }

  // 核心就这一句话。new 一个Watcher，上文多次提到的家伙。
  vm._watcher = new Watcher(vm, updateComponent, noop)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
new Watcher()
上个代码片段核心就这一句话。
vm._watcher = new Watcher(vm, updateComponent, noop)。
重点是这个Watcher第二个参数，updateComponent,很重要。
new Watcher我们着重看下构造函数内部的代码即可，如下是精简过后的代码

export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: ISet;
  newDepIds: ISet;
  getter: Function;
  value: any;

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: Object
  ) {
    this.vm = vm
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    // 此时expOrFn为上述的updateComponent
    this.getter = expOrFn
    // 由于此时lazy是falsly值,触发get
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  get () {
    // 该函数将Dep.target置为当前watcher。
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      // 调用getter实际是调用updateComponent
      // 由于updateComponent会调用options.render，所以会触发
      // vm._render函数,而vm._render函数中的核心则是
      // vnode = render.call(vm, vm.$createElement)
      // 在 compileToFunctions生成的render函数 一节我们已经看到了一个rendre函数大概的面貌
      // 此时render函数中有时候会取读取vm.a的值。有时会取读取vm.b的值。
      // 当读取vm.a或者b的时候，就会触发对应属性的getter
      // 然后会将当前的Watcher加入属性对应的dep中。
      // 联系不起来的同学可以往回看，defineReactive中的dep收集的就是当前watcher了。
      // 当用户点击页面的a+1按钮时，则会触发this.a += 1。
      // 则会触发defineReactive(obj, a, {get,set})中的set，
      // set中会调用dep.notify。其实就是让dep收集到的watcher挨个执行
      // 下述中的run方法.
      // 而run方法又触发了当前的这个get方法，执行到getter.call的时候，界面就更新了。
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  run () {
    if (this.active) {
      // 关键一句就是获取值，实际上这里的获取值就是
      // get -> this.get -> updateComponent -> 虚拟节点中重新获取
      // 界面中需要的a,b的值。
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }
总结
此时一个大概的关于data是如何影响view的流程基本跑通了。以界面数据a为例，
核心思想就是defineReactive(data, a, {get,set})去设置属性a的getter,setter。

getter将会在vue执行render函数生成虚拟dom的时候，将界面更新的watcher放入a的dep中。

当鼠标单击界面上的a+1按钮触发this.a += 1时候，会触发a的setter函数，此时会将getter时收集的依赖————更新界面的watcher————触发。watcher执行自身的run方法，即更新界面。

至此data -> view这一层算是通了，至于input中的v-model实际上是input + onInput事件的语法糖，监听input，值改变时候通过事件修改vm.a的值，进一步触发————更新界面的watcher，使界面更新。