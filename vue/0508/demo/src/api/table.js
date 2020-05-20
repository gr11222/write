import request from '@/utils/request'
const cmdid_table = "10001"
export function table(data){
    return request({
        url:"/table",
        method:"post",
        data:{...data,cmdid_table}
    })
}