<template>
    <div class="content-outerbox">
        <el-row class="list">
            <el-col :span="12">
                <el-input placeholder="请输入关键字搜索" v-model="search" class="input-with-select">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                </el-input>
            </el-col>
            <el-col :span="12" style="text-align:right;">
                <el-button type="primary" @click="showCard()">新建</el-button>
            </el-col>
            <el-col>
                <el-table
                    :data="
                        tableData.filter(
                            data =>
                                !search ||
                                data.userName.toLowerCase().includes(search.toLowerCase()) ||
                                data.roleName.toLowerCase().includes(search.toLowerCase())
                        )
                    "
                    border
                    :max-height="tableHeight"
                    ref="table"
                    style="width: 100%"
                    :default-sort="{ prop: 'userName', order: 'descending' }"
                >
                    <el-table-column prop="userName" label="用户名" sortable></el-table-column>
                    <el-table-column prop="roleName" label="用户角色" sortable></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <!-- <el-button size="mini" @click="handleReset(scope.$index, scope.row)">重置密码</el-button> -->
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog title="新建用户" :visible.sync="dialogFormVisible">
            <el-form :rules="rules" ref="ruleForm" :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName" style="width:80%">
                    <el-input v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="密码" :label-width="formLabelWidth" prop="passWord" style="width:80%">
                    <el-input v-model="form.passWord" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="form.role" placeholder="请选择用户角色">
                        <el-option label="管理员" value="admin"></el-option>
                        <el-option label="录入员" value="input"></el-option>
                        <el-option label="作业人员" value="worker"></el-option>
                        <el-option label="财务人员" value="finance"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getUserList, addUser, resetPW, delUser } from "../../service/dao";
export default {
  name: "userManager",
  data: function() {
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (!/^[a-zA-z0-9_]{1,50}$/.test(this.form.userName)) {
          callback(new Error("用户名必须由数字字母下划线组成"));
        }
        callback();
      }
    };
    var validatePassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (!/^[\w]{6,20}$/.test(this.form.passWord)) {
          callback(new Error("密码长度必须6位以上且由数字字母下划线组成"));
        }
        callback();
      }
    };
    return {
      input: "",
      tableData: [],
      tableHeight: window.innerHeight - 229,
      search: "",
      dialogFormVisible: false,
      form: {
        userName: "",
        passWord: "",
        role: "admin"
      },
      formLabelWidth: "120px",
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }]
        // passWord: [{ validator: validatePassWord, trigger: 'blur' }]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let loadingInstance = this.$loading({ target: ".content" });
      getUserList({}).then(
        res => {
          loadingInstance.close();
          if (res.value.users) {
            this.tableData = res.value.users.map(k => {
              k.roleName = "管理员";
              if (k.role === "input") k.roleName = "录入员";
              if (k.role === "worker") k.roleName = "作业人员";
              if (k.role === "finance") k.roleName = "财务人员";
              return k;
            });
          }
        },
        error => {
          loadingInstance.close();
        }
      );
      loadingInstance.close();
    },
    showCard() {
      this.dialogFormVisible = true;
    },
    addUser() {
      this.dialogFormVisible = false;
      let loadingInstance = this.$loading({ target: ".content" });
      addUser({
        userName: this.form.userName,
        // passWord: this.form.passWord,
        role: this.form.role
      }).then(
        res => {
          loadingInstance.close();
          this.$message.success("添加成功");
          this.init();
        },
        error => {
          loadingInstance.close();
        }
      );
      loadingInstance.close();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addUser();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleReset(index, row) {
      this.$confirm("确认重置密码？")
        .then(_ => {
          let loadingInstance = this.$loading({ target: ".content" });
          resetPW({
            userName: row.userName
          }).then(
            res => {
              loadingInstance.close();
              this.$message.success("重置成功");
            },
            error => {
              loadingInstance.close();
            }
          );
          loadingInstance.close();
        })
        .catch(_ => {});
    },
    handleDelete(index, row) {
      this.$confirm("确认删除用户？")
        .then(_ => {
          let loadingInstance = this.$loading({ target: ".content" });
          delUser({
            userName: row.userName,
            role: row.role
          }).then(
            res => {
              loadingInstance.close();
              this.$message.success("删除成功");
              this.init();
            },
            error => {
              loadingInstance.close();
            }
          );
          loadingInstance.close();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.login-tips {
  font-size: 14px;
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
</style>
