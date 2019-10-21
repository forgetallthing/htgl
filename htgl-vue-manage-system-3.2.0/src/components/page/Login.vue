<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">合同管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getKey, login } from "../../service/dao";
import CryptoJS from "crypto-js";
import common from "../common/common";
export default {
  data: function() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^[\w]+$/.test(value)) {
        callback(new Error("密码必须由数字、字母、下划线组成"));
      } else {
        callback();
      }
    };
    return {
      key: "",
      ruleForm: {
        username: "admin",
        password: "admin"
      },
      rules: {
        username: [
          {
            validator: validateUsername,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.key) {
            this.$message.error("网络连接失败，请刷新重试");
            return;
          } else {
            let p = {
              v: this.encryptByDES(
                JSON.stringify({
                  loginName: this.ruleForm.username,
                  pwd: this.ruleForm.password
                })
              )
            };
            login(p).then(res => {
              if (res.value.uid) {
                common.setCookie("uid", res.value.uid);
                localStorage.setItem("ms_username", this.ruleForm.username);
                localStorage.setItem("ms_role", res.value.role);
                this.$router.push("htList");
              } else {
                this.$message.error("登录失败，请刷新重试");
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getKey() {
      getKey({
        type: "login"
      }).then(res => {
        if (res.value == "已登录") {
          this.$router.push("htList");
        } else {
          this.key = res.value;
        }
      });
    },
    encryptByDES(message) {
      var keyHex = CryptoJS.enc.Utf8.parse(this.key);
      var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    },
  },
  mounted() {
    this.$nextTick(function() {
      common.setCookie("testCookie", "testCookie", 1);
      if (common.getCookie("testCookie") != "testCookie") {
        alert("浏览器禁用Cookie,请打开cookie");
      }
      this.getKey();
    });
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 21px;
  color: #2967bc;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 460px;
  margin: -160px 0 0 -230px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.75);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
  background-color: #2967bc;
  border-color: #2967bc;
}
.login-tips {
  font-size: 16px;
  color: #303133;
  margin-top: 14px;
  overflow: hidden;
}
.login-tips-1 {
  float: left;
  width: 88px;
  line-height: 18px;
}
.login-tips-2 {
  float: left;
  width: 292px;
  line-height: 18px;
  height: auto;
  margin-left: 15px;
}
.login-tips a {
  color: #303133;
}
</style>