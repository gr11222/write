<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  data() {
    let i = 0;
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(
        Object.assign(item, {
          name: "王小虎" + ++i
        })
      ),
      centerDialogVisible: false
    };
  }
};
</script>

<style>
.app-main {
  width: 100%;
  height: calc(100% - 60px);
}
</style>
