import request from '@/utils/request'
const cmdid_login = 4001;
const cmdid_logout = 4002;
const cmdid_editpass = 4007;
export function login(username,password){
    const data = {username,password,cmdid:cmdid_login}
    return request({
        url:"/login",
        method:"post",
        data
    })
}
export function logout(){
    const data = {cmdid:cmdid_logout}
    return request({
        url:"/logout",
        method:"post",
        data
    })
}
export function editpass(form){
    const data = {...form,cmdid:cmdid_editpass}
    return request({
        url:"/logout",
        method:"post",
        data
    })
}