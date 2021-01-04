class HistoryRouter{
    constructor(){
        this.current=null;
    }
}
class vueRouter{
    constructor(options){
        this.mode=options.mode || 'hash';
        // 数据结构思维
        this.routes = options.routes || [];
        this.routesMap = this.createMap(this.routes);

        this.history = new HistoryRouter();
        this.init();
        this.afterEach=()=>{};
    }
    init(){
        if(this.mode === 'hash'){
            location.hash?'':location.hash='/';
            window.addEventListener('load', ()=>{
                this.history.current=location.hash.slice(1);
            })
            window.addEventListener('hashchange', ()=>{
                this.history.current = location.hash.slice(1);
            })
        }else{
            location.pathname? '':location.pathname = "/";
            window.addEventListener('load',()=>{
                this.history.current = location.pathname
            })
            window.addEventListener("popstate",()=>{
                this.history.current = location.pathname
            })
        }
    }
    createMap(routes){
        return routes.reduce((memo, current)=>{
            memo[current.path]=current.component;
            return memo;
        }, {});
    }
}

vueRouter.install=function(vue){
    // 单例模式。保持全局只有一个对象，考虑代码健壮性
    if(vueRouter.install.installed) return;
    vueRouter.install.installed=true;
    vue.mixin({
        beforeCreate:function() {
            // main -> app.vue ->  组件
            // 判断是否是根实例
            if(this.$options &&  this.$options.router){
                this._root=this; 
                this._router=this.$options.router;
                // this._router.history为对象，this.history.current = location.pathname会触发set中的notify触发render中的watcher更新
                vue.util.defineReactive(this, 'current', this._router.history);
            }else if(this.$parent){
                // app.vue 挂载 父级的_root
                // console.log(this)
                this._root=this.$parent._root;
            }
            // 变量权限思维：设置两个只读属性，用于操作router
            Object.defineProperty(this,'$router', {
                get(){
                    return this._root._router;
                }
            });
            Object.defineProperty(this,'$route', {
                get(){
                    return this._root._router.history.current;
                }
            })
        },
    })
    // current 监视了 current变量-> current改变时重新渲染 -> render获取到新的current值 -> 渲染对应current组件
    vue.component('router-view',{
        render(h){
            let current = this._self._root._router.history.current;
            let routesMap = this._self._root._router.routesMap;
            return h(routesMap[current]);
        }
    })
    vue.component('router-link',{
        props:{
            to:String
        },
        render(h){
            let mode = this._self._root._router.mode;
            let to = mode === "hash"?"#"+this.to:this.to
            return h('a',{attrs:{href:to}},this.$slots.default)
            // return h('a',{},'首页')
        }
    })
}

export default vueRouter
