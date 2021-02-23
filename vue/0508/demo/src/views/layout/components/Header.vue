<template>
  <el-container class="headeraaa">
    <el-header style="text-align: right; font-size: 14px;height:50px;">
      <i class="el-icon-user-solid" style="margin-right: 5px;"></i>
      <span>用户：</span>
      <span>{{user}}</span>
      <i class="el-icon-s-tools" @click="dialogSwitch" style="margin-left: 12px;cursor:pointer;"></i>
      <i
        class="el-icon-switch-button"
        @click="logout"
        style="margin-left: 12px;font-weight:bold;cursor:pointer;"
      ></i>
    </el-header>
    <editpass :dialog.sync="dialogVisible" />
  </el-container>
</template>

<script>
import { editpass } from "@/api/login";
import Editpass from "./editpass";
export default {
  name: "Header",
  data() {
    return {
      dialogVisible: false,
      tableData: []
    };
  },
  components: {
    Editpass
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    logout() {
      this.$confirm("确认退出？", "提示", {
        confirmButtonText: "确定",
        showCancelButton: true,
        callback: action => {
          if ("confirm" === action)
            this.$store.dispatch("Logout").then(() => {
              location.reload();
            });
        }
      });
    },
    dialogSwitch() {
      this.dialogVisible = true;
    },
    editpass() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          editpass({
            curpassword: this.editForm.curpass,
            password: this.editForm.pass,
            username: this.user
          }).then(() => {
            this.$alert("修改成功！", "", {
              confirmButtonText: "确定",
              callback: () => {
                this.$store.dispatch("Logout").then(() => {
                  location.reload();
                });
              }
            });
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
  
<style scoped lang="less">
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 50px;
}

.el-aside {
  color: #333;
}
.breadcrumb {
  padding-bottom: 5px;
  border-bottom: 1px solid #909399;
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
</style>
<style scoped>
  .headeraaa >>> .aaa{
    color:red;
  }
</style>