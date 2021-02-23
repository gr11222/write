<template>
  <el-dialog width="400px" title="修改密码" :visible.sync="dialogVisible" :close-on-click-modal="false">
    <el-form
      :model="editForm"
      status-icon
      :rules="rules"
      ref="editForm"
      label-width="80px"
      class="editForm"
    >
      <div class="aaa">222222</div>
      <el-form-item label="原密码" prop="curpass">
        <el-input type="password" v-model="editForm.curpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="editForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="editForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="form-btn-box">
        <el-button type="primary" @click="editpass">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog> 
</template>

<script>
import { editpass } from "@/api/login";
export default {
  name: "Editpass",
  props: {
    dialog: {
      required: true
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.editForm.checkPass !== "") {
          this.$refs.editForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateCurPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      tableData: [],
      editForm: {
        curpass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        curpass: [{ validator: validateCurPass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
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
  },
  watch: {
    dialog(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("update:dialog", val);
    }
  }
};
</script>

<style lang="less" scoped>
.el-dialog {
  line-height: normal;
  .form-btn-box {
    float: right;
  }
}
</style>