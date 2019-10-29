<template>
    <div class="content-outerbox">
        <el-row class="list">
            <el-col :span="24">
                <el-form ref="ruleForm" :model="filter" label-position="left" label-width="100px">
                    <el-row :gutter="20">
                        <el-col :hidden="filterHidden.htbh" :span="6">
                            <el-form-item label-width="80px" label="合同编号:">
                                <el-input @keyup.enter.native="search()" placeholder="请输入" v-model="filter.htbh"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :hidden="filterHidden.xmmc" :span="6">
                            <el-form-item label-width="80px" label="项目名称:">
                                <el-input @keyup.enter.native="search()" placeholder="请输入" v-model="filter.xmmc"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :hidden="filterHidden.wtdw" :span="6">
                            <el-form-item label-width="80px" label="委托单位:">
                                <el-input @keyup.enter.native="search()" placeholder="请输入" v-model="filter.wtdw"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :hidden="filterHidden.skjd" :span="6">
                            <el-form-item label-width="80px" label="收款进度:">
                                <el-input @keyup.enter.native="search()" placeholder="请输入" v-model="filter.skjd"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :hidden="filterHidden.htfcsj" :span="2.4">
                            <el-form-item label-width="100px" label="项目承接时间:"> </el-form-item>
                        </el-col>
                        <el-col :hidden="filterHidden.htfcsj" :span="4">
                            <el-date-picker
                                value-format="yyyy-MM-dd"
                                class="date-picker"
                                v-model="filter.startTime"
                                type="date"
                                placeholder="起始日期"
                            >
                            </el-date-picker>
                        </el-col>
                        <el-col :hidden="filterHidden.htfcsj" :span="4">
                            <el-date-picker value-format="yyyy-MM-dd" class="date-picker" v-model="filter.endTime" type="date" placeholder="结束日期">
                            </el-date-picker>
                        </el-col>
                        <el-col :hidden="filterHidden.htfhsj" :span="6">
                            <el-form-item label-width="100px" label="合同返回时间:">
                                <el-select v-model="filter.htfhsj" placeholder="请选择">
                                  <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                                <!-- <el-date-picker
                                    value-format="yyyy-MM-dd"
                                    class="date-picker"
                                    v-model="filter.htfhsj"
                                    type="date"
                                    placeholder="选择日期"
                                >
                                </el-date-picker> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="text-align:right;">
                            <el-button style="width:80%;" type="primary" @click="search()">搜索</el-button>
                        </el-col>
                        <el-col :hidden="['input', 'admin', 'finance'].indexOf(ms_role) == -1" :span="3" style="text-align:right;">
                            <el-button style="width:80%;" type="primary" @click="showCard()">新建</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>

            <el-col>
                <el-table
                    :data="tableFilterData"
                    border
                    :max-height="tableHeight"
                    ref="table"
                    style="width: 100%"
                    :default-sort="{ prop: 'col1', order: 'descending' }"
                >
                    <el-table-column v-if="!filterHidden.col_htbh" prop="htbh" label="合同编号" sortable></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" sortable></el-table-column>
                    <el-table-column prop="wtdw" label="委托单位" sortable></el-table-column>
                    <el-table-column v-if="!filterHidden.col_htfcsj" prop="htfcsj" label="合同发出时间" sortable></el-table-column>
                    <el-table-column v-if="!filterHidden.col_htfhsj" prop="htfhsj" label="合同返回时间" sortable></el-table-column>
                    <el-table-column  prop="xmkssj" label="项目开始时间" sortable></el-table-column>
                    <el-table-column v-if="!filterHidden.col_skjd" prop="skjd" label="收款进度" sortable></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog title="新建" :visible.sync="dialogFormVisible">
            <el-form :rules="rules" ref="ruleForm" :model="form">
                <el-form-item label="合同编号" :label-width="formLabelWidth" prop="htbh" style="width:80%">
                    <el-input v-model="form.htbh" autocomplete="off"></el-input>
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
import { getContracts, addContract, delContract } from "../../service/dao";
export default {
  name: "htList",
  data: function() {
    return {
      tableData: [],
      tableFilterData: [],
      tableHeight: window.innerHeight - 229,
      filter: {
        htfhsj: "全部"
      },
      filterHidden: {
        col_htbh: false,
        col_htfcsj: false,
        col_htfhsj: false,
        col_skjd: false
      },
      ms_role: "",
      form: {
        htbh: ""
      },
      rules: {
        htbh: [{ required: true, message: "请输入合同编号", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      options: [
        {
          label: "全部",
          value: "全部"
        },
        {
          label: "已返回",
          value: "已返回"
        },
        {
          label: "未返回",
          value: "未返回"
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.ms_role = localStorage.getItem("ms_role");
      if (this.ms_role === "input") {
        this.filterHidden = {
          wtdw: true,
          htfcsj: true,
          htfhsj: true,
          skjd: true,
          col_skjd: true
        };
      }
      if (this.ms_role === "worker") {
        this.filterHidden = {
          htbh: true,
          wtdw: true,
          htfcsj: true,
          htfhsj: true,
          skjd: true,
          col_htbh: true,
          col_htfcsj: true,
          col_htfhsj: true,
          col_skjd: true,
        };
      }
      let loadingInstance = this.$loading({ target: ".content" });
      getContracts({}).then(
        res => {
          loadingInstance.close();
          this.tableData = res.value.contracts;
          this.search();
        },
        error => {
          loadingInstance.close();
        }
      );
      loadingInstance.close();
    },
    search() {
      var result = this.tableData.filter(v => {
        var flag = true;
        if (this.filter.htbh && v.htbh.indexOf(this.filter.htbh) === -1)
          return false;
        if (this.filter.xmmc && v.xmmc.indexOf(this.filter.xmmc) === -1)
          return false;
        if (this.filter.wtdw && v.wtdw.indexOf(this.filter.wtdw) === -1)
          return false;
        if (this.filter.skjd && v.skjd.indexOf(this.filter.skjd) === -1)
          return false;
        if (this.filter.htfhsj === "已返回" && !v.htfhsj) return false;
        if (this.filter.htfhsj === "未返回" && v.htfhsj) return false;
        if (this.filter.startTime && v.xmkssj <= this.filter.startTime)
          return false;
        if (this.filter.endTime && v.xmkssj >= this.filter.endTime)
          return false;
        return true;
      });
      this.tableFilterData = result;
    },
    showCard() {
      this.dialogFormVisible = true;
    },
    newBuild() {
      let loadingInstance = this.$loading({ target: ".content" });
      addContract({
        htbh: this.form.htbh
      }).then(
        res => {
          loadingInstance.close();
          this.$message.success("新建成功");
          this.dialogFormVisible = false
          this.form.htbh = "";
          this.init();
        },
        error => {
          loadingInstance.close();
        }
      );
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.newBuild();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleEdit(index, row) {
      this.$router.push({
        name: "edit",
        params: {
          htbh: row.htbh
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm("确认删除？")
        .then(_ => {
          let loadingInstance = this.$loading({ target: ".content" });
          delContract({
            htbh: row.htbh
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
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
.el-col,
.el-row {
  margin-bottom: 0;
}
</style>
