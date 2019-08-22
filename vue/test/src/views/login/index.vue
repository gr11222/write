<template>
  <div id="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on"/>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <!-- <span class="show-pwd" @click="showPwd"></span> -->
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >login</el-button>
    </el-form>
  </div>
</template>
<script>
import { log } from "util";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "1111111"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      loading: false,
      showDialog: false,
      redirect: undefined
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$request({
            url: "/login",
            method: "post",
            data: this.loginForm
          }).then(data => {
            this.loading = false;
            if (data.data.ret == 0) {
              this.$router.push("/layout");
            } else {
              this.$message({
                message: "err",
                type: "err",
                duration: 500
              });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
#login {
  height: 100%;
  .login-form {
    width: 500px;
    margin: 0 auto;
    margin-top: 20%;
  }
}
</style>
