import Mock from 'mockjs';
import loginAPI from './login';
import tableAPI from './table';


// 登录相关
Mock.mock(/\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/table/, 'post', tableAPI.getList);

export default Mock;
