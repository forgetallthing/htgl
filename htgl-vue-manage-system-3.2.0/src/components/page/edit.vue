<template>
  <div class>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" icon="el-icon-back" size="mini" @click="back()">返回</el-button>
      </el-col>
      <el-col :span="12" style='text-align:end'>
        <el-button type="primary" icon="el-icon-download" size="mini" @click="exportTable()">导出excel</el-button>
      </el-col>
      <el-col>
        <form-create class='edit-form' ref="fc" v-model="fApi" :rule="rule" :option="option"></form-create>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getContractContent, saveContract } from "../../service/dao";
export default {
  name: "",
  data() {
    return {
      fApi: {
      },
      model: {},
      rule: [
      ],
      option: {
        form: {
          labelPosition: "left",
          labelWidth: "100px"
        },
        row: {
          gutter: 10
        },
        submitBtn: {
          innerText: "保存"
        },
        onSubmit: function(formData) {
          alert(JSON.stringify(formData));
        }
      }
    };
  },
  mounted() {
    this.model = this.fApi.model();
    this.init();
  },
  watch: {},
  methods: {
    init() {
      console.log(this.$route.params);
      this.param = this.$route.params;
      // if(!this.$route.params.col1){
      //   this.$router.go(-1);
      // }
      let loadingInstance = this.$loading({ target: ".content" });
      getContractContent({
        htbh: 1,
        role: "input"
      }).then(
        res => {
          console.log(res.value.struct);
          
          this.rule = res.value.struct;
          this.$nextTick(()=>{
            this.fApi.setValue(res.value.data)
          })
          setTimeout(()=>{
             
          },2000)
          
          loadingInstance.close();
        },
        error => {
          loadingInstance.close();
        }
      );
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveContract();
        } else {
          this.$message.error("发现输入错误，请修改");
          return false;
        }
      });
    },
    saveContract() {
      let loadingInstance = this.$loading({ target: ".content" });
      saveContract({
        form: this.form
      }).then(
        res => {
          loadingInstance.close();
          this.$message.success("保存成功");
        },
        error => {
          loadingInstance.close();
        }
      );
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    back() {
      this.$router.go(-1);
    },
    exportTable(){

    }
  }
};
</script>
<style>
.el-row {
  margin-bottom: 20px;
  background-color: #ffffff;
  padding: 10px;
}
.el-col {
  margin-bottom: 6px;
}
</style>
<style lang="" scoped></style>
