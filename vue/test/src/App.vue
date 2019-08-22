<template>
  <transition name="fade-transform" mode="out-in">
    <div id="app">
      <router-view/>
    </div>
  </transition>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
#app {
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
