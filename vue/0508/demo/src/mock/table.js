import Mock from 'mockjs';

const rows = [];
const total = 21;

for (let i = 0; i < total; i++) {
    rows.push(Mock.mock({
    time: +Mock.Random.date('T'),
    username: '@name()'
  }));
}

export default {
  getList: () => {
    return {
      total,rows
    };
  }
};
