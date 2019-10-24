<template>
  <div class="content-outerbox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>密码管理</span>
      </div>
      <div class="form-box">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="当前密码:" prop="currentpass">
            <el-input type="password" v-model="ruleForm.currentpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设置密码:" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="再次输入:" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">清空</el-button>
            <el-button class="button-r" type="primary" @click="submitForm('ruleForm')">修改密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { changePW, getKey } from "../../service/dao";
import CryptoJS from "crypto-js";
export default {
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入当前密码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^[\w]{6,20}$/.test(value)) {
        callback(new Error("密码必须由数字、字母、下划线组成,且长度不小于6位"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      key: "",
      ruleForm: {
        pass: "",
        checkPass: "",
        currentpass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        currentpass: [{ validator: validatePass1, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.changePw();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changePw() {
      if (!this.key) {
        this.$message.error("网络连接失败，请刷新重试");
        return;
      } else {
        let p = {
          v: this.encryptByDES(
            JSON.stringify({
              currentpass: this.ruleForm.currentpass,
              pass1: this.ruleForm.pass,
              pass2: this.ruleForm.checkPass
            })
          )
        };
        let loadingInstance = this.$loading({ target: ".content" });
        changePW(p).then(
          res => {
            loadingInstance.close();
            this.$message({
              message: "修改成功",
              type: "success"
            });
          },
          function(error) {
            loadingInstance.close();
          }
        );
      }
    },
    getKey() {
      getKey({
        type: "changePW"
      }).then(res => {
        this.key = res.value;
      });
    },
    encryptByDES(message) {
      var keyHex = CryptoJS.enc.Utf8.parse(this.key);
      var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.getKey();
    });
  }
};
</script>

<style scoped>
.button-r:focus {
    color: #ffffff;
}
</style>