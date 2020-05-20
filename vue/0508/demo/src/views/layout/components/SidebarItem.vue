<template>
  <div v-if="item.name">
    <el-submenu :index="item.path" v-if="item.children">
      <template slot="title">
        <span slot="title">{{item.name}}</span>
      </template>
      <SidebarItem v-for="i in item.children" :key="i.path" :item="i" :basePath="basePath+item.path+'/'"/>
    </el-submenu>
    <template v-else>
      <router-link class="link" :to="item.path" :key="item.path">
        <el-menu-item :index="`${basePath}${item.path}`">{{item.name}}</el-menu-item>
      </router-link>
    </template>
  </div>
</template>
  
  <script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
  }
};
</script>
<style lang="less" scoped>
.link {
  display: inline-block;
  text-decoration: none;
}
</style>
<style lang="less">
.scrollbar-wrapper{
  .el-menu-item{
    height: 26px;
    line-height: 26px;
  }
  .el-submenu__title{
    height: 30px;
    line-height: 30px;
  }
}
</style>
  