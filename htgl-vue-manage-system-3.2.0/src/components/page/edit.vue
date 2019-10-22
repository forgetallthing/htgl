<template>
    <div class>
        <el-row>
            <el-col>
                <el-button type="primary" icon="el-icon-back" size="mini" @click="back()">返回</el-button>
            </el-col>
            <el-col>
                <el-form ref="ruleForm" :rules="rules" :model="form" label-position="right" label-width="120px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="承接单位">
                                <el-input v-model="form.undertakingUnit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="完成部门">
                                <el-input v-model="form.CompleteDepartment"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同类型">
                                <el-input v-model="form.contractType"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同编号" prop="contractNumber">
                                <el-input v-model="form.contractNumber"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="协作部门">
                                <el-input v-model="form.cooperateDepartment"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同份数(份)" prop="htfs">
                                <el-input v-model="form.htfs"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同金额(元)" prop="htje">
                                <el-input v-model="form.htje"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目名称" prop="entryName">
                                <el-input v-model="form.entryName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="决策金额(元)">
                                <el-input v-model="form.jcje"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="委托单位" prop="wtdw">
                                <el-input v-model="form.wtdw"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系人及电话" prop="phone">
                                <el-input v-model="form.phone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="对方单位" prop="dfdw">
                                <el-input v-model="form.dfdw"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="垫资金额" prop="dzje">
                                <el-input v-model="form.dzje"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同发出时间">
                                <el-input v-model="form.htfcsj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同返回时间">
                                <el-input v-model="form.htfhsj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="工程所在区域" prop="gcszqy">
                                <el-input v-model="form.gcszqy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目开始时间" prop="xmkssj">
                                <el-input v-model="form.xmkssj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="预计完成时间" prop="yjwcsj">
                                <el-input v-model="form.yjwcsj"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目负责人" prop="xmfzr">
                                <el-input v-model="form.xmfzr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目类别">
                                <el-input v-model="form.xmlb"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="工程性质">
                                <el-input v-model="form.gcxz"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目成员">
                                <el-input v-model="form.xmcy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目进行状态">
                                <el-input v-model="form.xmjxzt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否重点项目">
                                <el-input v-model="form.sfzdxm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同审核人" prop="htshr">
                                <el-input v-model="form.htshr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="付费方式">
                                <el-input v-model="form.fffs"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="分管领导" prop="fgld">
                                <el-input v-model="form.fgld"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="合同概要" prop="htgy">
                                <el-input type="textarea" v-model="form.htgy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提前开工">
                                <el-input v-model="form.tqkg"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="备注">
                                <el-input v-model="form.remark"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同附件">
                                <el-input v-model="form.enclosure"></el-input>
                                <!-- <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="新增人员">
                                <el-input v-model="form.addPerson"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getContractContent, saveContract } from '../../service/dao';
export default {
    name: '',
    data() {
        return {
            form: {
                undertakingUnit: '',
                CompleteDepartment: '',
                contractType: '',
                contractNumber: '',
                cooperateDepartment: '',
                htfs: '',
                htje: '',
                entryName: '',
                jcje: '',
                wtdw: '',
                phone: '',
                dfdw: '',
                dzje: '',
                htfcsj: '',
                htfhsj: '',
                gcszqy: '',
                xmkssj: '',
                yjwcsj: '',
                xmfzr: '',
                xmlb: '',
                gcxz: '',
                xmcy: '',
                xmjxzt: '',
                sfzdxm: '',
                htshr: '',
                fffs: '',
                fgld: '',
                htgy: '',
                tqkg: '',
                remark: '',
                fileList: [],
                enclosure: '',
                addPerson: ''
            },
            rules: {
                contractNumber: [{ required: true, message: '请输入合同编号', trigger: 'blur' }],
                htfs: [{ required: true, message: '请输入合同份数', trigger: 'blur' }],
                entryName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
                htje: [{ required: true, message: '请输入合同金额', trigger: 'blur' }],
                wtdw: [{ required: true, message: '请输入委托单位', trigger: 'blur' }],
                phone: [{ required: true, message: '请输入联系人及电话', trigger: 'blur' }],
                dfdw: [{ required: true, message: '请输入对方单位', trigger: 'blur' }],
                dzje: [{ required: true, message: '请输入垫资金额', trigger: 'blur' }],
                gcszqy: [{ required: true, message: '请输入工程所在区域', trigger: 'blur' }],
                xmkssj: [{ required: true, message: '请输入项目开始时间', trigger: 'blur' }],
                yjwcsj: [{ required: true, message: '请输入预计完成时间', trigger: 'blur' }],
                xmfzr: [{ required: true, message: '请输入项目负责人', trigger: 'blur' }],
                htshr: [{ required: true, message: '请输入合同审核人', trigger: 'blur' }],
                fgld: [{ required: true, message: '请输入分管领导', trigger: 'blur' }],
                htgy: [{ required: true, message: '请输入合同概要', trigger: 'blur' }]
            },
            param:{}
        };
    },
    mounted() {
        this.init();
    },
    watch: {},
    methods: {
        init() {
            console.log(this.$route.params);
            this.param = this.$route.params
            if(!this.$route.params.col1){
              this.$router.go(-1);
            }
            let loadingInstance = this.$loading({ target: '.content' });
            getContractContent({
                form: this.$route.params
            }).then(
                res => {
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
                    this.$message.error('发现输入错误，请修改');
                    return false;
                }
            });
        },
        saveContract() {
            let loadingInstance = this.$loading({ target: '.content' });
            saveContract({
                form: this.form
            }).then(
                res => {
                    loadingInstance.close();
                    this.$message.success('保存成功');
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
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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
