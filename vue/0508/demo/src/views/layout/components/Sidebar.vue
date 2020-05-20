<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path"
      mode="vertical"
    >
      <sidebar-item v-for="route in routers" :key="route.path" :item="route" :basePath="route.path.split('/')[0]"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'routers'
    ])
  }
};
</script>

<style lang="less" scoped>
.el-scrollbar{
  height: 100%;
}
.el-submenu__title{
    background: #001655 !important;
  }
  .el-menu{
    border-right:none;
  }
</style>