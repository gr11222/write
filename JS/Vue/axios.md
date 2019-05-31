经过实验，axios的get方法中使用params时对于js数组类型的参数的默认操作比较诡异，会使得参数名后带上'[]'字符串，不得不说是基本反非PHP系后端的直觉了 /手动斜眼

而使用JSON.stringify()处理也不是那么好，会将参数变成字符串类型，例如原数组id为[1,2,3],这样处理后后端接受的就变为'id=[1,2,3]'了，可以解析，但对于使用某些框架自带解析的来说这简直是崩坏画风。

究其原因是axios对params的序列化采用的是qs库

因此可以使用qs自带的 arrayFormat 参数配置解决这个问题，大致配置如下：
const qs = require('qs');

axios.get(url, {
    params:{
        arr: [1,2,3]
    },
    paramsSerializer: function(params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
    }
})