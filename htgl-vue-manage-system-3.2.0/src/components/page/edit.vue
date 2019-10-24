<template>
  <div class>
    <el-row>
      <el-col>
        <el-button type="primary" icon="el-icon-back" size="mini" @click="back()">返回</el-button>
      </el-col>
      <el-col>
        <!-- <el-form ref="ruleForm" :rules="rules" :model="form" label-position="left" label-width="100px">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="承接单位">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="选项" value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同类型">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="选项" value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同编号">
                                <el-input v-model="form.contractType"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="合同发出时间" prop="contractNumber">
                                <el-input v-model="form.contractNumber"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目名称">
                                <el-select style="width:100%;" v-model="form.region" placeholder="请选择">
                                    <el-option label="选项" value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="作业部门" prop="htfs">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="选项" value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="合同返回时间" prop="htje">
                                <el-input v-model="form.htje"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="委托单位" prop="entryName">
                                <el-select style="width:100%;" v-model="form.region" placeholder="请选择">
                                    <el-option label="选项" value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系人及电话">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="选项" value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="委合同总金额" prop="wtdw">
                                <el-input v-model="form.wtdw"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="项目开始时间" prop="phone">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="选项" value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="预计完成时间" prop="dfdw">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="选项" value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="项目负责人" prop="dzje">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="选项" value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="项目成员">
                                <el-input v-model="form.htfcsj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="外业作业时间" prop="gcszqy">
                                <el-input v-model="form.gcszqy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="外业作业内容" prop="xmkssj">
                                <el-input v-model="form.xmkssj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="外业工作量" prop="yjwcsj">
                                <el-input v-model="form.yjwcsj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="作业人员" prop="xmfzr">
                                <el-input v-model="form.xmfzr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="外业作业时间" prop="gcszqy">
                                <el-input v-model="form.gcszqy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="外业作业内容" prop="xmkssj">
                                <el-input v-model="form.xmkssj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="外业工作量" prop="yjwcsj">
                                <el-input v-model="form.yjwcsj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="作业人员" prop="xmfzr">
                                <el-input v-model="form.xmfzr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="外业作业时间" prop="gcszqy">
                                <el-input v-model="form.gcszqy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="外业作业内容" prop="xmkssj">
                                <el-input v-model="form.xmkssj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="外业工作量" prop="yjwcsj">
                                <el-input v-model="form.yjwcsj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="作业人员" prop="xmfzr">
                                <el-input v-model="form.xmfzr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="内业作业时间" prop="gcszqy">
                                <el-input v-model="form.gcszqy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="内业作业内容" prop="xmkssj">
                                <el-input v-model="form.xmkssj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="内业工作量" prop="yjwcsj">
                                <el-input v-model="form.yjwcsj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="作业人员" prop="xmfzr">
                                <el-input v-model="form.xmfzr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="内业作业时间" prop="gcszqy">
                                <el-input v-model="form.gcszqy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="内业作业内容" prop="xmkssj">
                                <el-input v-model="form.xmkssj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="内业工作量" prop="yjwcsj">
                                <el-input v-model="form.yjwcsj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="作业人员" prop="xmfzr">
                                <el-input v-model="form.xmfzr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="内业作业时间" prop="gcszqy">
                                <el-input v-model="form.gcszqy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="110px" label="内业作业内容" prop="xmkssj">
                                <el-input v-model="form.xmkssj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="内业工作量" prop="yjwcsj">
                                <el-input v-model="form.yjwcsj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="作业人员" prop="xmfzr">
                                <el-input v-model="form.xmfzr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="项目结算方式">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="选项" value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="项目单价">
                                <el-input v-model="form.gcxz"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="决算金额">
                                <el-input v-model="form.xmcy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:-40px;" :gutter="20">
                        <el-col style="width:20%;">
                            <el-form-item label="是否开票">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="选项" value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:20%;">
                            <el-form-item label="发票类型">
                                <el-input v-model="form.sfzdxm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:20%;">
                            <el-form-item label="收款进度" prop="htshr">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="选项" value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:20%;">
                            <el-form-item label="收款时间">
                                <el-input v-model="form.fffs"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:20%;">
                            <el-form-item label="收款金额" prop="fgld">
                                <el-input v-model="form.fgld"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:-40px;" :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="合同概要" prop="htgy">
                                <el-input type="textarea" v-model="form.htgy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="form.htgy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
        </el-form>-->
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
    //   form: {},
    //   rules: {
    //     contractNumber: [
    //       { required: true, message: "请输入合同编号", trigger: "blur" }
    //     ],
    //     htfs: [{ required: true, message: "请输入合同份数", trigger: "blur" }],
    //     entryName: [
    //       { required: true, message: "请输入项目名称", trigger: "blur" }
    //     ],
    //     htje: [{ required: true, message: "请输入合同金额", trigger: "blur" }],
    //     wtdw: [{ required: true, message: "请输入委托单位", trigger: "blur" }],
    //     phone: [
    //       { required: true, message: "请输入联系人及电话", trigger: "blur" }
    //     ],
    //     dfdw: [{ required: true, message: "请输入对方单位", trigger: "blur" }],
    //     dzje: [{ required: true, message: "请输入垫资金额", trigger: "blur" }],
    //     gcszqy: [
    //       { required: true, message: "请输入工程所在区域", trigger: "blur" }
    //     ],
    //     xmkssj: [
    //       { required: true, message: "请输入项目开始时间", trigger: "blur" }
    //     ],
    //     yjwcsj: [
    //       { required: true, message: "请输入预计完成时间", trigger: "blur" }
    //     ],
    //     xmfzr: [
    //       { required: true, message: "请输入项目负责人", trigger: "blur" }
    //     ],
    //     htshr: [
    //       { required: true, message: "请输入合同审核人", trigger: "blur" }
    //     ],
    //     fgld: [{ required: true, message: "请输入分管领导", trigger: "blur" }],
    //     htgy: [{ required: true, message: "请输入合同概要", trigger: "blur" }]
    //   },
    //   param: {},
    //   formStruct: [
    //     {
    //       id: "cjdw",
    //       label: "承接单位",
    //       type: "select",
    //       isHidden: true,
    //       isDisable: true,
    //       span: 6,
    //       items: [
    //         { value: "吉利集团", label: "吉利集团" },
    //         { value: "大众集团", label: "大众集团" }
    //       ]
    //     },
    //     {
    //       id: "htlx",
    //       label: "合同类型",
    //       type: "select",
    //       span: 6,
    //       items: []
    //     },
    //     {
    //       id: "htbh",
    //       label: "合同编号",
    //       type: "input",
    //       span: 6
    //     }
    //   ],
      fApi: {},
      model: {
      },
      rule: [
        // {
        //   type: "input",
        //   title: "商品名称",
        //   field: "goods_name",
        //   value: "iphone 7",
        //   col: {
        //     span: 6,
        //   },
        //   props: {
        //     type: "text",
        //     disabled: true,
        //   },
        // }
      ],
      option: {
        form:{
            labelPosition: 'left',
            labelWidth: '100px',
        },
        row:{
            gutter: 10,
        },
        submitBtn:{
            innerText: "保存",
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
        role: "admin"
      }).then(
        res => {
          console.log(res);
          this.rule = res.value.struct
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
