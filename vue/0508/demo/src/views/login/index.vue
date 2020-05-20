<template>
  <div class="container">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="50px"
      class="login-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        <el-button @click="resetFrom()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error("请输入用户名！"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error("请输入密码！"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "admin",
        password: "admin"
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    resetFrom() {
      this.ruleForm.username = "";
      this.ruleForm.password = "";
    },
    submitForm(formName) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading"
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("Login",this.ruleForm).then(()=>{
            loading.close();
            // 保证路由添加结束后被守卫捕获
            location.reload()
          }).catch(()=>{
            loading.close();
          })
        } else {
          loading.close();
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
  text-align: center;
  background-color: whitesmoke;
  .login-ruleForm {
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .el-input {
    width: 300px;
  }
}
</style>
