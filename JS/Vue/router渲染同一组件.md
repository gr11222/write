在 router-view上加上一个唯一的key来保证路由切换时都会重新渲染触发钩子了
<router-view :key="key"></router-view>

computed: {
	key() {
	    return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
	}
}
