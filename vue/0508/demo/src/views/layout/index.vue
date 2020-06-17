<template>
  <el-container>
    <el-header style="font-size: 14px;height:50px;">
      <Header />
    </el-header>
    <el-container>
      <sidebar class="sidebar-container" />
      <el-main class="main-view">
        <Breadcrumb />
        <router-view class="view-container" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Sidebar,
    Breadcrumb
  },
  computed: {},
  methods: {}
};
</script>
  
<style scoped lang="less">
.main-view {
  padding: 0;
  border-left: solid 1px #e6e6e6;
  .view-container {
    min-height: calc(100vh - 91px);
    padding: 5px 10px;
  } 
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 50px;
}

.el-aside {
  color: #333;
}

.editForm {
  .form-btn-box {
    float: right;
  }
}

.sidebar-container {
  transition: width 0.28s;
  width: 200px !important;
  flex-shrink: 0;
  min-height: calc(100vh - 50px);
  overflow: hidden;
}
</style>
<style lang="less">
.el-dialog__body:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  overflow: hidden;
}
.sidebar-container {
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
}
</style>