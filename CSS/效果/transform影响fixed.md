不知道曾经的你是不是遇到吸顶效果，就是使用 position:fixed 这个属性。其实如果其父元素中有使用 transform，fixed 的效果会降级为 absolute。
解决方案：
既然会降级为 absolute 效果，我们该怎么解决这个问题呢？我们就改考虑什么情况下 fixed 和 absolute 的表现效果会是一样的。
即当使用 fixed 的直接父元素的高度和屏幕的高度相同时 fixed 和 absolute 的表现效果会是一样的。
如果这个直接父级内的元素存在滚动的情况，那就加上 overflow-y: auto。