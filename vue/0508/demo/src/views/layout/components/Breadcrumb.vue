<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    
    <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-s-home"></i>&nbsp;首页</el-breadcrumb-item>
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item) in list" :key="item.path">
        <span class="no-redirect">{{item.name}}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
  
  <script>
export default {
  data() {
    return {
      list: []
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.list = this.$route.matched;
    }
  }
};
</script>
  
<style lang="less" scoped>
.breadcrumb {
  padding-bottom: 5px;
}
.app-breadcrumb.el-breadcrumb {
  font-size: 14px;
  line-height: 30px;
  padding-left: 7px;
  border-bottom: 1px solid #e6e6e6;
}
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
  